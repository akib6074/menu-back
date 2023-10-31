import { Type } from 'class-transformer';
import { Allow } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class SystemTasksDto extends BaseDto {
  @Allow()
  name_en: string;

  @Allow()
  type: string;

  @Allow()
  controller: string;

  @Allow()
  ordering: number;

  @Type(()=>SystemTasksDto)
  parent: SystemTasksDto;

  @Type(() => SystemTasksDto)
  children: SystemTasksDto[];
}
