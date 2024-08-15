import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityController],
  providers: [ActivityService, UserService],
})
export class ActivityModule {}
