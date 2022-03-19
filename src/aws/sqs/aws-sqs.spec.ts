import { SqsService } from './aws-sqs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SqsMessageBuilder } from './sqs.message.builder';
import { AppConfig } from '../../config/AppConfig';
import { SQS } from 'aws-sdk';

describe('SqsService', () => {
  let appConfig;
  let sqsMessageBuilder;
  let awsSqs;
  let sqsService: SqsService;

  const mockAppConfig = () => ({ getAssociateReportQueueUrl: jest.fn() });
  const mockMessageBuilder = () => ({ build: jest.fn() });
  const mockSqs = () => ({ sendMessage: jest.fn() });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppConfig, useFactory: mockAppConfig },
        { provide: SqsMessageBuilder, useFactory: mockMessageBuilder },
        { provide: 'AWS_SQS', useFactory: mockSqs },
        SqsService,
      ],
    }).compile();

    sqsMessageBuilder = module.get<SqsMessageBuilder>(SqsMessageBuilder);
    appConfig = module.get<AppConfig>(AppConfig);
    sqsService = module.get<SqsService>(SqsService);
    awsSqs = module.get<SQS>('AWS_SQS');
  });

  describe('ioc registration', () => {
    it('SqsService should be defined', () => {
      expect(sqsService).toBeDefined();
    });

    it('SqsMessageBuilder should be defined', () => {
      expect(sqsMessageBuilder).toBeDefined();
    });

    it('AppConfig should be defined', () => {
      expect(appConfig).toBeDefined();
    });
  });

  describe('it should send the message', () => {
    beforeEach(() => {
      awsSqs.sendMessage.mockReset();
    });

    it('should send a message', async () => {
      appConfig.getAssociateReportQueueUrl.mockReturnValue('http://aws.sqs');
      awsSqs.sendMessage.mockImplementation(() => {
        return {
          promise() {
            return Promise.resolve({ MessageId: 123456 });
          },
        };
      });

      const message = sqsMessageBuilder.build();
      const result = await sqsService.send(message);

      expect(result).toBeTruthy();
      expect(awsSqs.sendMessage).toHaveBeenCalled();
    });

    it('fails to send the message', async () => {
      appConfig.getAssociateReportQueueUrl.mockReturnValue('http://aws.sqs');
      awsSqs.sendMessage.mockImplementation(() => {
        return {
          promise() {
            throw new Error('I am an error!');
          },
        };
      });

      const message = sqsMessageBuilder.build();
      const result = await sqsService.send(message);

      expect(result).toBeFalsy();
      expect(awsSqs.sendMessage).toHaveBeenCalled();
    });
  });
});
