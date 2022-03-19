import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Hello } from '../domain';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get('/:message')
  async hello(@Param('message') message: string): Promise<Hello> {
    console.log(`hello: ${message}`);
    return await this.helloService.hello(message);
  }
}
