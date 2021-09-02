import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateDrawingInput {
  @Field({ nullable: true })
  imageData?: string

  @Field({ nullable: true })
  isFavorite?: boolean
}
