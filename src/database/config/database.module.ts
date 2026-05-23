import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'enterprise_hub_nest',
      entities: [__dirname + '/../models/*.ts'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
