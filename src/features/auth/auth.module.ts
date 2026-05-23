import { Module } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
