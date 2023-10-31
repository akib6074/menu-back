import { Allow } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class UserGroupsUpdateDto extends BaseDto {
  @Allow()
  id: number;

  @Allow()
  name: string;

  @Allow()
  ordering: number;

  @Allow()
  action_0: string;

  @Allow()
  action_1: string;

  @Allow()
  action_2: string;

  @Allow()
  action_3: string;

  @Allow()
  action_4: string;

  @Allow()
  action_5: string;

  @Allow()
  action_6: string;

  @Allow()
  action_7: string;

  @Allow()
  action_8: string;
}
