import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 20, nullable: false, type: 'varchar' })
  name: string;
  @Column({
    name: 'abbreviation',
    length: 4,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  abbreviation: string;
  @Column({ name: 'status', nullable: false, type: 'int2', default: 1 })
  status: number;

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
  @ManyToMany(() => User, (user: User) => user.roles, { nullable: false })
  users: User[];
}
