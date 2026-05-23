import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesDto {
  @ApiProperty({ example: 'Empresa Teste' })
  name!: string;

  @ApiProperty({ example: '12345678901234' })
  cnpj!: string;
}
