import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemTasksEntity, UsersEntity } from 'src/common';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/services/response.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, SystemTasksEntity]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, ResponseService],
})
export class AuthModule {}
