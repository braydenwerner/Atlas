import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateNoteInput {
  @Field({ nullable: true })
  body?: string

  @Field({ nullable: true })
  isFavorite?: boolean
}
