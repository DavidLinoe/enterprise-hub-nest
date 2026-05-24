import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(user: Partial<User>): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async register(user: Partial<User>): Promise<User> {
    const entity = this.usersRepository.create(user);
    return await this.usersRepository.save(entity);
  }
}
