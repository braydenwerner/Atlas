import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Habit extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  uid: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column({ default: false })
  isChecked: boolean

  //  cannot link with primary key
  // @Field(() => UserAccount)
  // @ManyToOne(() => UserAccount, (user) => user.todos)
  // @JoinColumn({ name: 'id' })
  // user: UserAccount

  @Field()
  @CreateDateColumn()
  checkedAt: Date

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
