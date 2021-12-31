import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateHabitInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  isChecked?: boolean
}
