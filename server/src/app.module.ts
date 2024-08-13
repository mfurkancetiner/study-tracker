import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ActivityModule, DatabaseModule, UserModule ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
