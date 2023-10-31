import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/common';
import { ResponseService } from 'src/common/services/response.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptService } from 'src/common/services/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 5000,
				maxRedirects: 5,
			}),
		}),
  ],
  exports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService, ResponseService, BcryptService],
})
export class UsersModule {}
