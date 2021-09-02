import { Query, Mutation, Resolver, Arg, Int, Ctx } from 'type-graphql'

import { MyContext } from '../types'
import { Note } from '../Entities/index'
import { UpdateNoteInput } from './UpdateNoteInput'
import { getUserId } from '../utils'

@Resolver()
export class NoteResolver {
  @Query(() => [Note], { nullable: true })
  getNotes(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Note.find({ uid })
  }

  @Mutation(() => Note)
  createNote(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Note.create({ uid }).save()
  }

  @Mutation(() => Boolean)
  updateNote(
    @Ctx() ctx: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateNoteInput
  ) {
    const uid = getUserId(ctx)

    Note.update(
      { id, uid },
      {
        ...data,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  deleteNote(@Ctx() ctx: MyContext, @Arg('id', () => Int) id: number) {
    const uid = getUserId(ctx)

    Note.delete({ id, uid })
    return true
  }
}
