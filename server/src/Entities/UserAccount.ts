import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  //OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
//import { Todos } from './Todos'

@ObjectType()
@Entity()
export class UserAccount extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  uid: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  photoURL: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  selectedUserBackground: string

  @Field({ defaultValue: 'dark' })
  @Column({ default: 'dark' })
  colorTheme: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  greetingMessage: string

  // @Field(() => [Todos])
  // @OneToMany(() => Todos, (todo) => todo.id)
  // todos: Todos[]

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  lastLoggedIn: Date

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
