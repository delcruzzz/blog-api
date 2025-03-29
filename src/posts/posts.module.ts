import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersController } from 'src/users/users.controller';
import { RolesController } from 'src/roles/roles.controller';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  controllers: [PostsController, UsersController, RolesController],
  providers: [PostsService, UsersService, RolesService],
  imports: [TypeOrmModule.forFeature([Post, User, Role])],
})
export class PostsModule {}
