import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ResponseService } from 'src/common/services/response.service';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly responseService: ResponseService,
        private readonly userService: UsersService
    ){}
    @Post("create")
    create(
        @Body() dto: UserDto
    ): Promise<any> {
        const create = this.userService.create(dto);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, create);
    }
}
