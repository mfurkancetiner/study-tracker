import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './auth/auth.module';
import { ApiTokenCheckMiddleware } from './middleware/api-token-check.middleware';

@Module({
  imports: [ActivityModule, DatabaseModule, UserModule ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes({path: 'activity*', method: RequestMethod.ALL})
  }
}
/* export class AppModule {} */