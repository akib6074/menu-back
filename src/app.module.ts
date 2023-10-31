import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigModule } from './common/database-config/database.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeormConfigModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
