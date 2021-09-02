import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field()
  uid: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  photoURL?: string

  @Field({ nullable: true })
  selectedUserBackground?: string

  @Field({ nullable: true })
  greetingMessage?: string

  @Field({ nullable: true })
  lastLoggedIn?: Date
}
