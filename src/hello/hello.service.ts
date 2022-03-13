import { Injectable } from '@nestjs/common';
import { Hello } from '../domain';

@Injectable()
export class HelloService {
  hello(): object {
    return new Hello('hi');
  }
}
