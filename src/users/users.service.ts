/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    const passwordHashed = await bcrypt.hash(user.password, 10);
    user.password = passwordHashed;

    try {
      if (createUserDto.rolesIds) {
        const roles = await this.rolesRepository.findBy({
          id: In(createUserDto.rolesIds),
        });
        user.roles = roles;
      }

      await this.usersRepository.save(user);

      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        username: user.username,
      };
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
    return await this.usersRepository
      .createQueryBuilder('users')
      .innerJoin('users.roles', 'roles')
      .select([
        'users.id',
        'users.name',
        'users.lastname',
        'users.phone',
        'users.email',
        'users.username',
        'users.status',
        'roles.id',
        'roles.name',
        'roles.abbreviation',
        'roles.status',
      ])
      .getMany();
  }

  async findOne(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .innerJoin('users.roles', 'roles')
      .select([
        'users.id',
        'users.name',
        'users.lastname',
        'users.phone',
        'users.email',
        'users.username',
        'users.status',
        'roles.id',
        'roles.name',
        'roles.abbreviation',
        'roles.status',
      ])
      .where('users.id = :id', { id })
      .getOne();

    if (!user)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    try {
      if (updateUserDto.password) {
        const passwordHashed = await bcrypt.hash(user.password, 10);
        user.password = passwordHashed;
      }

      if (updateUserDto.rolesIds) {
        const roles = await this.rolesRepository.findBy({
          id: In(updateUserDto.rolesIds),
        });
        user.roles = roles;
      }

      await this.usersRepository.save(user);

      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        username: user.username,
      };
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
    return `This action removes a #${id} user`;
  }
}
