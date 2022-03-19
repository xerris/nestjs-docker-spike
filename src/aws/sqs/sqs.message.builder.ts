import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsMessageBuilder {
  public build = <T>(payload: T, sqsEndpoint: string) => ({
    DelaySeconds: 10,
    MessageBody: JSON.stringify(payload),
    QueueUrl: sqsEndpoint,
  });
}
