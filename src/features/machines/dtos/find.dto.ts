import { ApiProperty } from '@nestjs/swagger';

export class FindMachinesDto {
  @ApiProperty({
    required: true,
    description: 'User ID to filter companies',
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
  })
  machineId!: string;
}
