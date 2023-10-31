import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroupsEntity } from 'src/common';
import { Repository } from 'typeorm';
import { UserGroupsDto } from './user-groups.dto';
import { UserGroupsUpdateDto } from './user-groups-update.dto';
import { activeStatus } from 'src/common/enum/activeStatus.enum';

@Injectable()
export class UserGroupsService {
  constructor(
    @InjectRepository(UserGroupsEntity)
    private readonly userGroupsEntity: Repository<UserGroupsEntity>,
  ) {}

  findAll = async (): Promise<any> => {
    try {
      return this.userGroupsEntity.find({
        where: { status: 'Active' },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  create = async (dto: UserGroupsDto): Promise<any> => {
    try {
      const userGroup = this.userGroupsEntity.create(dto);
      await this.userGroupsEntity.save(userGroup);
      return userGroup;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  findById = async (id: number): Promise<any> => {
    try {
      const userGroup = await this.userGroupsEntity.findOne({
        where: {
          id: id,
          status: 'Active',
        },
      });
      return userGroup;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  update = async (dto: UserGroupsUpdateDto[]): Promise<any> => {
    try {
        return dto.map(async(data)=>{
            await this.userGroupsEntity.update(data?.id,data);
        });
    } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  updateByFieldandGroupId = async (id: number ,field: string, value: string, action: string): Promise<any> => {
    try {
      const saved = await this.userGroupsEntity.findOne({
        where: {
          id: id,
          ...activeStatus
        }
      });
      if(action=='checked'){
        saved[field] += value+',';
        await this.userGroupsEntity.save(saved);
      }else{
        saved[field] = saved[field].split(",").filter((val)=>val!=value).toString();
        await this.userGroupsEntity.save(saved);
      }
      return saved;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
