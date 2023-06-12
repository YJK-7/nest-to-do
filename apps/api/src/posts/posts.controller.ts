import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get('all/:email')
  async allPosts(@Param('email') email: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        author: {
          email: email,
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Get('not-finished')
  async getNotFinishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { isFinished: false },
    });
  }

  @Get('finished')
  async getFinishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { isFinished: true },
    });
  }

  @Post('create')
  async createToDo(
    @Body()
    postData: {
      title: string;
      content?: string;
      dueDate?: string;
      authorEmail: string;
    },
  ): Promise<PostModel> {
    const { title, content, dueDate, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      dueDate,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body()
    postData: {
      title?: string;
      content?: string;
      dueDate?: string;
      isFinished?: boolean;
      authorEmail?: string;
    },
  ): Promise<PostModel> {
    const { title, content, dueDate, isFinished, authorEmail } = postData;

    return await this.postService.updatePost({
      where: { id: Number(id) },
      data: {
        title,
        content,
        dueDate,
        isFinished: isFinished,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  @Put('change-status/:id')
  async changeFinishStatus(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postService.post({ id: Number(id) });

    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { isFinished: !post.isFinished },
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
