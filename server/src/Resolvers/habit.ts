import { Query, Mutation, Resolver, Arg, Int, Ctx } from 'type-graphql'

import { MyContext } from '../types'
import { Habit } from '../Entities/index'
import { UpdateHabitInput } from './UpdateHabitInput'
import { getUserId } from '../utils'

@Resolver()
export class HabitResolver {
  @Query(() => [Habit], { nullable: true })
  getHabits(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Habit.find({ uid })
  }

  @Mutation(() => Habit)
  createHabit(@Ctx() ctx: MyContext, @Arg('title') title: string) {
    const uid = getUserId(ctx)

    return Habit.create({ uid, title }).save()
  }

  @Mutation(() => Boolean)
  updateHabit(
    @Ctx() ctx: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateHabitInput
  ) {
    const uid = getUserId(ctx)

    Habit.update(
      { id, uid },
      {
        ...data,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  deleteHabit(@Ctx() ctx: MyContext, @Arg('id', () => Int) id: number) {
    const uid = getUserId(ctx)

    Habit.delete({ id, uid })
    return true
  }
}
