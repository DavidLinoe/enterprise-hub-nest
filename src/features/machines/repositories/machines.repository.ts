import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/database/models/machine';
import { Repository } from 'typeorm';

@Injectable()
export class MachinesRepository {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async find(machinesId: string): Promise<[Machine[], number]> {
    return await this.machinesRepository.findAndCount({
      where: { id: machinesId },
    });
  }

  async findAll(): Promise<[Machine[], number]> {
    return await this.machinesRepository.findAndCount({
      where: {},
    });
  }

  async create(machine: Partial<Machine>): Promise<Machine> {
    const entity = this.machinesRepository.create(machine);
    return await this.machinesRepository.save(entity);
  }

  async update(machine: Partial<Machine>): Promise<Machine | null> {
    if (!machine.id) {
      return null;
    }
    return await this.machinesRepository
      .update(machine.id, machine)
      .then(() => {
        return this.machinesRepository.findOne({ where: { id: machine.id } });
      });
  }

  async delete(machinesId: string): Promise<Machine | null> {
    const entity = await this.machinesRepository.findOne({
      where: { id: machinesId },
    });
    if (!entity) {
      return null;
    }
    return await this.machinesRepository.remove(entity);
  }
}
