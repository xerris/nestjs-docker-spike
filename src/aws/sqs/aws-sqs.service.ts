import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { SqsMessageBuilder } from './sqs.message.builder';
import { AppConfig } from '../../config/AppConfig';
import { SQS } from 'aws-sdk';

@Injectable({ scope: Scope.DEFAULT })
export class SqsService {
  private logger = new Logger(SqsService.name);

  constructor(
    @Inject(SqsMessageBuilder) private messageBuilder: SqsMessageBuilder,
    @Inject(AppConfig) private appConfig: AppConfig,
    @Inject('AWS_SQS') private awsSqs: SQS,
  ) {}

  public async send(payload: SQS.SendMessageRequest): Promise<boolean> {
    try {
      const result = await this.awsSqs.sendMessage(payload).promise();
      this.logger.debug(`SQS message sent id: ${result.MessageId}`);

      return true;
    } catch (error) {
      this.logger.error(`Error sending SQS message: ${error}`);

      return false;
    }
  }
}
