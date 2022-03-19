import { Module } from '@nestjs/common';
import { AppConfig } from './AppConfig';

@Module({
  providers: [AppConfig],
  exports: [AppConfig],
})
export class AppConfigModule {}
