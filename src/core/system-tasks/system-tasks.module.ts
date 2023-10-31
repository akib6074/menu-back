import { Module } from '@nestjs/common';
import { SystemTasksController } from './system-tasks.controller';
import { SystemTasksEntity } from 'src/common/entiites/system-tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SystemTasksService } from './system-tasks.service';
import { ResponseService } from 'src/common/services/response.service';
import { UserGroupsEntity } from 'src/common';


@Module({
    imports:[
        TypeOrmModule.forFeature([SystemTasksEntity, UserGroupsEntity]),
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 5000,
				maxRedirects: 5,
			}),
		}),
    ],
    exports: [SystemTasksModule],
    controllers: [SystemTasksController],
    providers: [SystemTasksService, ResponseService]
})
export class SystemTasksModule {}
