import { Inject, Injectable } from '@nestjs/common';
import {
  updateDynamoEasyConfig,
  DynamoStore,
  ModelConstructor,
} from '@shiftcoders/dynamo-easy';
import { AppConfig } from '../../config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

@Injectable()
export class DynamoDbService {
  constructor(
    @Inject(AppConfig)
    private config: AppConfig,
  ) {
    updateDynamoEasyConfig({
      tableNameResolver: (tableName: string) => {
        return `${this.config.getTableNamePrefix()}${tableName}`;
      },
    });
  }

  public createStore<T>(model: ModelConstructor<T>): DynamoStore<T> {
    return new DynamoStore<T>(
      model,
      new DynamoDB({ region: this.config.getRegion() }),
    );
  }
}
