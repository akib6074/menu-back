import { Controller,Post,Get,Param, HttpStatus, Body, Put } from '@nestjs/common';
import { ResponseService } from 'src/common/services/response.service';
import { UserGroupsService } from './user-groups.service';
import { UserGroupsDto } from './user-groups.dto';
import { UserGroupsUpdateDto } from './user-groups-update.dto';

@Controller('user-groups')
export class UserGroupsController {
    constructor(
        private readonly userGroupsService: UserGroupsService,
        private readonly responseService: ResponseService
    ){}

    @Get("all")
	findAll(): Promise<any> {
		const allUserGroups = this.userGroupsService.findAll();
		return this.responseService.toDtosResponse(HttpStatus.OK, null, allUserGroups);
	}

    @Get(":id")
    findById(
        @Param("id") id: number, 
    ): Promise<any> {
        const userGroup = this.userGroupsService.findById(id);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, userGroup);
    }

    @Post("create")
    create(
        @Body() dto: UserGroupsDto
    ): Promise<any> {
        const create = this.userGroupsService.create(dto);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, create);
    }
    
    @Put("update")
    update(
        @Body()dto: UserGroupsUpdateDto[]
    ): Promise<any> {
        const update = this.userGroupsService.update(dto);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, update);
    }

    @Put("update/:id/:field/:value/:action")
    updateByFieldandGroupId(
        @Param("id") id: number,
        @Param("field") field: string,
        @Param("value") value: string,
        @Param("action") action: string,
    ): Promise<any> {
        const update = this.userGroupsService.updateByFieldandGroupId(id,field,value,action);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, update);
    }
}
