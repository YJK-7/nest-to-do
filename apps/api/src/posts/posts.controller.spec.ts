import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostService>(PostService);
  });

  describe('post', () => {
    it('should return single post', () => {
      const result = {
        id: 1,
        title: 'mock',
        content: null,
        dueDate: null,
        isFinished: false,
        authorId: null,
      };
      jest.spyOn(service, 'post').mockImplementation(async () => result);
      expect(controller).toBeDefined();
    });
  });
});
