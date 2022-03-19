import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from './AppConfig';

describe('AppConfig', () => {
  let appConfig: AppConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfig],
    }).compile();

    appConfig = module.get<AppConfig>(AppConfig);
  });

  it('found the AppConfig', () => {
    expect(appConfig).not.toBeNull();
  });

  it('should have the region', () => {
    expect(appConfig.getRegion()).not.toBeUndefined();
    expect(appConfig.getRegion()).toBe('us-west-1');
  });

});
