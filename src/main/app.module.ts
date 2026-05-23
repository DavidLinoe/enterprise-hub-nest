import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthModule } from 'src/features/auth/auth.module';
import { DatabaseModule } from 'src/database/config/database.module';
import { CompaniesModule } from 'src/features/companies/companies.module';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, CompaniesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
