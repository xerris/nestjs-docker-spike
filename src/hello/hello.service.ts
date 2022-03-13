import { Injectable } from '@nestjs/common';
import { Hello } from '../domain';

@Injectable()
export class HelloService {
  async hello(message: string): Promise<Hello> {
    return new Hello(message);
  }
}
