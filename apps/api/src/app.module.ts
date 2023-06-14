import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [PostsModule, UsersModule, ScheduleModule.forRoot(), CronjobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
