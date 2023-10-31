import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/services/response.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly responseService: ResponseService
    ){}
    @Post("login")
    create(
        @Body() dto: LoginDto
    ): Promise<any> {
        const create = this.authService.login(dto);
        return this.responseService.toDtosResponse(HttpStatus.OK, null, create);
    }
}
