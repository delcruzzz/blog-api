import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesController } from 'src/roles/roles.controller';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  imports: [TypeOrmModule.forFeature([User, Role])],
})
export class UsersModule {}
