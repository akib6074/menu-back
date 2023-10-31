import { Controller,Get, Post, HttpStatus, Body, Param } from '@nestjs/common';
import { SystemTasksService } from './system-tasks.service';
import { ResponseService } from 'src/common/services/response.service';
import { SystemTasksDto } from './system-tasks.dto';

@Controller('system-tasks')
export class SystemTasksController {
    constructor(
        private readonly systemTaskService: SystemTasksService,
        private readonly responseService: ResponseService
    ){}

    @Get("all")
	findAll(): Promise<any> {
		const allSystemTasks = this.systemTaskService.findAll();
		return this.responseService.toDtosResponse(HttpStatus.OK, null, allSystemTasks);
	}

    @Get(":id")
    findById(
        @Param("id") id: number, 
    ): Promise<any> {
        const systemTask = this.systemTaskService.findById(id);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, systemTask);
    }

    @Get("role/:id")
    findAllByRole(
        @Param("id") id: number, 
    ): Promise<any> {
        const systemTasks = this.systemTaskService.findAllByRole(id);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, systemTasks);
    }

    @Post("create")
    create(
        @Body() dto: SystemTasksDto
    ): Promise<any> {
        const create = this.systemTaskService.create(dto);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, create);
    }
}
