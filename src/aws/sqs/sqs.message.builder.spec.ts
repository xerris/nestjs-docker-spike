import { SqsMessageBuilder } from './sqs.message.builder';

describe('SqsMessageBuilderTest', () => {
  let builder: SqsMessageBuilder;
  const sqsEndpoint = 'http://sqs-endpoint.com';

  beforeEach(() => {
    builder = new SqsMessageBuilder();
  });

  it('should build the sqs payload', () => {
    const body = { name: 'test', age: 1 };

    const message = builder.build(body, sqsEndpoint);

    expect(message).not.toBeNull();
    expect(message.MessageBody).toBe(JSON.stringify(body));
    expect(message.QueueUrl).toBe(sqsEndpoint);
  });
});
