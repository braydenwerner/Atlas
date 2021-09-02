import { Query, Mutation, Resolver, Arg, Int, Ctx } from 'type-graphql'

import { MyContext } from '../types'
import { Todo } from '../Entities/index'
import { UpdateTodoInput } from './UpdateTodoInput'
import { getUserId } from '../utils'

@Resolver()
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  getTodos(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Todo.find({ uid })
  }

  @Mutation(() => Todo)
  createTodo(@Ctx() ctx: MyContext, @Arg('title') title: string) {
    const uid = getUserId(ctx)

    return Todo.create({ uid, title }).save()
  }

  @Mutation(() => Boolean)
  updateTodo(
    @Ctx() ctx: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('data') data: UpdateTodoInput
  ) {
    const uid = getUserId(ctx)

    Todo.update(
      { id, uid },
      {
        ...data,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  deleteTodo(@Ctx() ctx: MyContext, @Arg('id', () => Int) id: number) {
    const uid = getUserId(ctx)

    Todo.delete({ id, uid })
    return true
  }
}
