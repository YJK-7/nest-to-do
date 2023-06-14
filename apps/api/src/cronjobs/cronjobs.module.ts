import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  providers: [CronjobsService],
  imports: [PostsModule],
})
export class CronjobsModule {}
