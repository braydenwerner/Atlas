import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Image extends BaseEntity {
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
  @Column()
  URL: string

  @Field()
  @Column({ default: false })
  isFavorite: boolean

  @Field()
  @Column({ default: true })
  imageInStorageBucket: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}
