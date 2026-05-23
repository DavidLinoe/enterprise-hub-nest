import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/database/models/company';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private companysRepository: Repository<Company>,
  ) {}

  async find(userId: string): Promise<[Company[], number]> {
    return await this.companysRepository.findAndCount({
      where: { users: { id: userId } },
    });
  }

  async create(company: Partial<Company>): Promise<Company> {
    const entity = this.companysRepository.create(company);
    return await this.companysRepository.save(entity);
  }

  async update(company: Partial<Company>): Promise<Company | null> {
    if (!company.id) {
      return null;
    }
    return await this.companysRepository
      .update(company.id, company)
      .then(() => {
        return this.companysRepository.findOne({ where: { id: company.id } });
      });
  }

  async delete(companyId: string): Promise<Company | null> {
    const entity = await this.companysRepository.findOne({
      where: { id: companyId },
    });
    if (!entity) {
      return null;
    }
    return await this.companysRepository.remove(entity);
  }
}
