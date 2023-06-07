import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  describe('createPost', () => {
    it('should create post', async () => {
      const expected = {
        id: 1,
        title: 'mock',
        content: null,
        isFinished: false,
        authorId: null,
      };
      jest
        .spyOn(service, 'createPost')
        .mockImplementation(async () => expected);

      expect(await service.createPost(expected)).toBe(expected);
      expect(service.posts).toHaveLength(1);
    });
  });

  describe('updatePost', () => {
    it('should update post', async () => {
      const expected = {
        id: 1,
        title: 'mock',
        content: null,
        isFinished: false,
        authorId: null,
      };
      jest
        .spyOn(service, 'createPost')
        .mockImplementation(async () => expected);

      expect(await service.createPost(expected)).toBe(expected);
      expect(service.posts).toHaveLength(1);
    });
  });
});
