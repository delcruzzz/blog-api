import { Post } from 'src/posts/entities/post.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  // campos necesarios de la entidad usuarios
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 45, nullable: false, type: 'varchar' })
  name: string;
  @Column({ name: 'lastname', length: 45, nullable: false, type: 'varchar' })
  lastname: string;
  @Column({
    name: 'phone',
    length: 11,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  phone: string;
  @Column({ name: 'email', nullable: false, type: 'text', unique: true })
  email: string;
  @Column({
    name: 'username',
    length: 20,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  username: string;
  @Column({ name: 'password', nullable: false, type: 'text' })
  password: string;
  @Column({ name: 'status', nullable: false, type: 'int2', default: 1 })
  status: number;

  // campos para manejar tiempos de creacion
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // relaciones
  @ManyToMany(() => Role, (role: Role) => role.users, { nullable: false })
  @JoinTable({
    name: 'roles_users',
  })
  roles: Role[];

  @OneToMany(() => Post, (post: Post) => post.user, { nullable: false })
  posts: Post[];
}
