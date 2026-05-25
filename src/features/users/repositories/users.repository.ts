import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async find(userId: string): Promise<[User[], number]> {
    return await this.usersRepository.findAndCount({
      where: { id: userId },
    });
  }

  async findAll(): Promise<[User[], number]> {
    return await this.usersRepository.findAndCount({
      where: {},
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const entity = this.usersRepository.create(user);
    return await this.usersRepository.save(entity);
  }

  async update(user: Partial<User>): Promise<User | null> {
    if (!user.id) {
      return null;
    }
    return await this.usersRepository.update(user.id, user).then(() => {
      return this.usersRepository.findOne({ where: { id: user.id } });
    });
  }

  async delete(userId: string): Promise<User | null> {
    const entity = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!entity) {
      return null;
    }
    return await this.usersRepository.remove(entity);
  }
}
