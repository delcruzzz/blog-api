import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 100, nullable: false, type: 'varchar' })
  name: string;
  @Column({ name: 'cover', nullable: true, type: 'text' })
  cover?: string;
  @Column({ name: 'content', nullable: false, type: 'text' })
  content: string;
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
  @ManyToOne(() => User, (user: User) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
