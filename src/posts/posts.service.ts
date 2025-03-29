/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);

    try {
      if (createPostDto.userId) {
        const user = await this.usersService.findOne(createPostDto.userId);
        post.user = user;
      }

      await this.postsRepository.save(post);

      return this.findOne(post.id);
    } catch (error: any) {
      if (error.code === '23505')
        throw new HttpException(
          { message: 'DUPLICATE_ERROR' },
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        { message: 'INTERNAL_SERVER_ERROR' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.postsRepository
      .createQueryBuilder('posts')
      .innerJoin('posts.user', 'user')
      .select([
        'posts.id',
        'posts.cover',
        'posts.content',
        'posts.status',
        'user.id',
        'user.name',
      ])
      .getMany();
  }

  async findOne(id: number) {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .innerJoin('posts.user', 'user')
      .select([
        'posts.id',
        'posts.cover',
        'posts.content',
        'posts.status',
        'user.id',
        'user.name',
      ])
      .where('posts.id = :id', { id })
      .getOne();

    if (!post)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.preload({
      id,
      ...updatePostDto,
    });

    if (!post)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    try {
      if (updatePostDto.userId) {
        const user = await this.usersService.findOne(updatePostDto.userId);
        post.user = user;
      }

      await this.postsRepository.save(post);

      return this.findOne(post.id);
    } catch (error: any) {
      if (error.code === '23505')
        throw new HttpException(
          { message: 'DUPLICATE_ERROR' },
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        { message: 'INTERNAL_SERVER_ERROR' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
