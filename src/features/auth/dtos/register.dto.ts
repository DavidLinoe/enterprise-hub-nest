import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'João da Silva' })
  name!: string;

  @ApiProperty({ example: 'joao@empresa.com' })
  email!: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  password!: string;

  @ApiProperty({ example: 'USER', enum: ['ADMIN', 'USER'] })
  role!: string;

  @ApiProperty({
    example: 'b3f1c2d4-5678-90ab-cdef-1234567890ab',
    description: 'UUID of the company to which the user belongs',
  })
  companyId!: string;
}
