import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config';
import { DynamoDbService } from './dynamodb.service';

@Module({
  imports: [AppConfigModule],
  providers: [DynamoDbService],
  exports: [DynamoDbService],
})
export class DynamoDbModule {}
