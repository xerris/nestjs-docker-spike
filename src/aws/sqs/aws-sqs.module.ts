import { Module } from '@nestjs/common';
import { SqsService } from './aws-sqs.service';
import { SqsMessageBuilder } from './sqs.message.builder';
import { AppConfigModule } from '../../config';
import { AppConfig } from '../../config';
import { SQS } from 'aws-sdk';

@Module({
  imports: [AppConfigModule],
  providers: [
    SqsService,
    SqsMessageBuilder,
    AppConfig,
    {
      provide: 'AWS_SQS',
      useValue: new SQS({ apiVersion: '2012-11-05' }),
    },
  ],
  exports: [SqsService, SqsMessageBuilder, 'AWS_SQS'],
})
export class AwsSqsModule {}
