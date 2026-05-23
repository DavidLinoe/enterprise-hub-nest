import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
