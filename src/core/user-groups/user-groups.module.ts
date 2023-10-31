import { Module } from '@nestjs/common';
import { UserGroupsService } from './user-groups.service';
import { UserGroupsController } from './user-groups.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupsEntity } from 'src/common';
import { ResponseService } from 'src/common/services/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroupsEntity]),
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 5000,
				maxRedirects: 5,
			}),
		}),
  ],
  exports: [UserGroupsModule],
  controllers: [UserGroupsController],
  providers: [UserGroupsService, ResponseService],
})
export class UserGroupsModule {}
