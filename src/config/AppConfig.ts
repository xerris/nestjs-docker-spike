import * as config from 'config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppConfig {
  private logger = new Logger(AppConfig.name);
  private awsConfig;
  private initialized: boolean;
  private awsS3ApiVersion: string;

  constructor() {
    this.awsConfig = config.get('aws');
  }

  public getRegion(): string {
    return this.awsConfig.region;
  }

  public getApiVersion() {
    return this.awsConfig.awsS3ApiVersion;
  }

  public getTableNamePrefix(): string {
    return this.awsConfig.tableNamePrefix;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.logger.debug('initializing application configuration');
    const region = config.get('aws')['region'];
    AWS.config.update({ region: region });
    this.logger.debug(`using AWS region: ${region}`);
  }

  public get(configKey: string) {
    return config.get(configKey);
  }
}
