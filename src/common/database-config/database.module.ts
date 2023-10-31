import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemTasksEntity, UsersEntity, UserGroupsEntity } from '../entiites/entities.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB'),
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
        entities: [
          SystemTasksEntity,
          UserGroupsEntity,
          UsersEntity
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormConfigModule {}

