import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

import { Redis } from '../enum/redis.enum';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          url: configService.get(Redis.REDIS_SESSION),
          name: 'REDIS_SESSION',
        },
        {
          url: configService.get(Redis.REDIS_REGISTER),
          name: 'REDIS_REGISTER',
        },
        {
          url: configService.get(Redis.REDIS_PREVENT_DOS_ATT),
          name: 'REDIS_PREVENT_DOS_ATT',
        },
        {
          url: configService.get(Redis.REDIS_TMP_FILE),
          name: 'REDIS_TMP_FILE',
        },
      ],
      inject: [ConfigService],
    }),
  ],
})
export class RedisConfigModule {}
