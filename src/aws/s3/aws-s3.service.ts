import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AppConfig } from '../../config';
import * as fs from 'fs';
import * as stream from 'stream';
import * as path from 'path';

@Injectable()
export class AWSS3Service {
  private s3Client: AWS.S3;

  constructor(@Inject(AppConfig) private appConfig: AppConfig) {
    this.s3Client = new AWS.S3({ apiVersion: this.appConfig.getApiVersion() });
  }

  public async getObject(
    bucketName: string,
    objectKey: string,
  ): Promise<Buffer> {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const response = await this.s3Client.getObject(params).promise();
    return response.Body as Buffer;
  }

  public async uploadFileInS3Bucket(filePath: string, bucketName: string) {
    const fileName = path.basename(filePath);

    const uploadStream = (S3: AWS.S3, Bucket: string, Key: string) => {
      const passThroughStream = new stream.PassThrough();
      return {
        writeStream: passThroughStream,
        promise: S3.upload({ Bucket, Key, Body: passThroughStream }).promise(),
      };
    };

    const { writeStream, promise } = uploadStream(
      this.s3Client,
      bucketName,
      fileName,
    );
    fs.createReadStream(filePath).pipe(writeStream);
    let output = true;
    await promise.catch((reason) => {
      output = false;
      throw new InternalServerErrorException(reason);
    });
    if (output) {
      console.log('file uploaded successfully');
    }
    return output;
  }
}
