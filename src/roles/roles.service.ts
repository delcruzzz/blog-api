/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);

    try {
      await this.rolesRepository.save(role);

      return {
        id: role.id,
        name: role.name,
        abbreviation: role.abbreviation,
        status: role.status,
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
    return await this.rolesRepository
      .createQueryBuilder('roles')
      .select(['roles.id', 'roles.name', 'roles.abbreviation', 'roles.status'])
      .getMany();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository
      .createQueryBuilder('roles')
      .select(['roles.id', 'roles.name', 'roles.abbreviation', 'roles.status'])
      .where('roles.id = :id', { id })
      .getOne();

    if (!role)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.preload({
      id,
      ...updateRoleDto,
    });

    if (!role)
      throw new HttpException({ message: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);

    try {
      await this.rolesRepository.save(role);

      return {
        id: role.id,
        name: role.name,
        abbreviation: role.abbreviation,
        status: role.status,
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
    return `This action removes a #${id} role`;
  }
}
