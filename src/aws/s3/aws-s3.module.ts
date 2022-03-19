import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config';
import { AWSS3Service } from './aws-s3.service';

@Module({
  imports: [AppConfigModule],
  providers: [AWSS3Service],
  exports: [AWSS3Service],
})
export class AwsS3Module {}
