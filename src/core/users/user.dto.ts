import { Allow } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';
import { UserGroupsDto } from '../user-groups/user-groups.dto';
import { Type } from 'class-transformer';

export class UserDto extends BaseDto {
  @Allow()
  name: string;

  @Allow()
  email: string;

  @Allow()
  password: string;
  
  @Type(() => UserGroupsDto)
  userGroup: UserGroupsDto;
}
