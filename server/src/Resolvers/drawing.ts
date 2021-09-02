import { Query, Mutation, Resolver, Arg, Int, Ctx } from 'type-graphql'

import { MyContext } from '../types'
import { Drawing } from '../Entities/index'
import { UpdateDrawingInput } from './UpdateDrawingInput'
import { getUserId } from '../utils'

@Resolver()
export class DrawingResolver {
  @Query(() => [Drawing], { nullable: true })
  getDrawings(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Drawing.find({ uid })
  }

  @Mutation(() => Drawing)
  createDrawing(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Drawing.create({ uid }).save()
  }

  @Mutation(() => Boolean)
  updateDrawing(
    @Ctx() ctx: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateDrawingInput
  ) {
    const uid = getUserId(ctx)

    Drawing.update(
      { id, uid },
      {
        ...data,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  deleteDrawing(@Ctx() ctx: MyContext, @Arg('id', () => Int) id: number) {
    const uid = getUserId(ctx)

    Drawing.delete({ id, uid })
    return true
  }
}
