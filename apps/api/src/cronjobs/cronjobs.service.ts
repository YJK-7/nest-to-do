import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from '../posts/post.service';

@Injectable()
export class CronjobsService {
  constructor(private readonly postService: PostService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'check due date',
  })
  async checkDueDate() {
    console.log('🌟');
    const today = new Date().setHours(0, 0, 0, 0);
    const allPosts = await this.postService.posts({
      where: {
        author: {
          email: 'Shota@Nukumizu.com',
        },
        dueDate: { not: null },
        isFinished: false,
      },
    });
    allPosts.map((post) => {
      const dueDate = new Date(post.dueDate).setHours(0, 0, 0, 0);
      if (dueDate <= today) {
        this.postService.updatePost({
          where: { id: Number(post.id) },
          data: {
            isFinished: true,
          },
        });
      }
    });
    return allPosts;
  }
}
