import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemTasksEntity, UserGroupsEntity } from 'src/common';
import { In, IsNull, Repository } from 'typeorm';
import { SystemTasksDto } from './system-tasks.dto';
import { activeStatus } from 'src/common/enum/activeStatus.enum';

@Injectable()
export class SystemTasksService {
  private readonly logger = new Logger(SystemTasksService.name);
  constructor(
    @InjectRepository(SystemTasksEntity)
    private readonly systemTaskEntity: Repository<SystemTasksEntity>,
    @InjectRepository(UserGroupsEntity)
    private readonly userGroupEntity: Repository<UserGroupsEntity>,
  ) {}

  findAll = async (): Promise<any> => {
    try {
      return this.systemTaskEntity.find({
        where: {
          parent: IsNull(),
          status: 'Active',
        },
        relations: [
          'children',
          'children.children',
          'children.children.children',
          'children.children.children.children',
        ],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  findAllByRole = async (id: number): Promise<any> => {
    try {
      const userGroup = await this.userGroupEntity.findOne({
        select: ['action_0'],
        where: {
          id: id,
          ...activeStatus,
        },
      });
      let children = userGroup?.action_0.split(',');

      children = children.filter((data) => data != '');

      let selectedAsNumberArray = children.map((item) => {
        return parseInt(item);
      });
      selectedAsNumberArray = [...new Set(selectedAsNumberArray)];
      let parents: number[] =[];
      const allParent = async (id: number)=>{
        if(!id)return;
        const parent =  await this.systemTaskEntity.query(
          `SELECT parentId FROM test_menu.system_tasks WHERE id=${id}`
        );
        if(parent[0]?.parentId!=null){
          parents.push(parent[0]?.parentId);
          await allParent(parent[0]?.parentId);
        }
      }
      for(let i=0;i<selectedAsNumberArray.length;i++){
        await allParent(selectedAsNumberArray[i]);
      }
      parents = parents.filter((val) => val != undefined);

      let final = selectedAsNumberArray.concat(parents);
      final = [...new Set(final)];
      let response = await this.systemTaskEntity.find({
        where: {
          id: In(final),
          parent: IsNull(),
          ...activeStatus,
        },
        relations: [
          'children',
          'children.children',
          'children.children.children',
          'children.children.children.children',
        ],
      });

      const helper = (data: SystemTasksDto[]) => {
        if (!data) return;
        for (let i = 0; i < data.length; i++) {
          if (data[i]?.children && data[i]?.children?.length > 0 && final.includes(data[i]?.id)) {
            helper(data[i]?.children);
          } else {
            if (final.includes(data[i]?.id) == false) {
              data.splice(i,1);
              i--;
            }
          }
        }
      };
      helper(response);
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  create = async (dto: SystemTasksDto): Promise<any> => {
    try {
      const systemTask = this.systemTaskEntity.create(dto);
      await this.systemTaskEntity.save(systemTask);
      return systemTask;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };

  findById = async (id: number): Promise<any> => {
    try {
      const systemTask = await this.systemTaskEntity.findOne({
        where: {
          id: id,
          status: 'Active',
        },
        relations: [
          'children',
          'children.children',
          'children.children.children',
          'children.children.children.children',
        ],
      });
      return systemTask;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  };
}
