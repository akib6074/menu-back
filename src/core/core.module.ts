import { Global, Module } from "@nestjs/common";
import { UsersEntity, configEnvironment, configTypeorm } from "../common";
import { SystemTasksModule } from "./system-tasks/system-tasks.module";
import { UserGroupsModule } from "./user-groups/user-groups.module";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from "src/common/services/bcrypt.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResponseService } from "src/common/services/response.service";
@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([UsersEntity]),
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 5000,
				maxRedirects: 5,
			}),
		}),
		configEnvironment(),
		configTypeorm(),
        SystemTasksModule,
		UserGroupsModule,
		UsersModule,
		AuthModule
	],
	providers: [UsersService, BcryptService, ResponseService],
	controllers: [UsersController],
	exports: [],
})
export class CoreModule {}
