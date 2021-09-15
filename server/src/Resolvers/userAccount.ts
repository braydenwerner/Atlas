import {
  Query,
  Mutation,
  Resolver,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from 'type-graphql'

import { FieldError } from './FieldError'
import { UserAccount } from '../Entities/index'
import { UpdateUserInput } from './UpdateUserInput'
import { MyContext } from '../types'
import { CreateUserInput } from './CreateUserInput'
import { createToken, getUserId } from '../utils'

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => UserAccount, { nullable: true })
  user?: UserAccount

  @Field(() => String, { nullable: true })
  token?: string
}

@Resolver()
export class UserResolver {
  @Query(() => UserAccount, { nullable: true })
  getUser(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return UserAccount.findOne({ uid })
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data') data: CreateUserInput): Promise<UserResponse> {
    let user: UserAccount

    try {
      user = await UserAccount.create({ ...data }).save()
    } catch (err) {
      return { errors: [{ field: 'createUser', message: err }] }
    }

    return { user, token: createToken(data.uid) }
  }

  @Mutation(() => UserResponse)
  async login(@Arg('uid') uid: string) {
    const user = await UserAccount.findOne({ uid })

    if (!user) {
      return { errors: [{ field: 'login', message: 'Could not find user' }] }
    }

    return { user, token: createToken(uid) }
  }

  @Mutation(() => Boolean)
  updateUser(@Ctx() ctx: MyContext, @Arg('data') data: UpdateUserInput) {
    const uid = getUserId(ctx)

    UserAccount.update(
      { uid },
      {
        ...data,
      }
    )
    return true
  }

  // @Mutation(() => UserResponse)
  // async subscribe(@Ctx() ctx: MyContext) {
  //   const uid = getUserId(ctx)

  //   const user = await UserAccount.findOne({ uid })

  //   if (!user) {
  //     return {
  //       errors: [{ field: 'subscribe', message: 'Could not find user' }],
  //     }
  //   }

  //   const customer = await stripe.customers.create({
  //     email: user.email,
  //     source,
  //     plan: process.env.StripePlan,
  //   })

  //   await UserAccount.update(
  //     { uid },
  //     {
  //       stripeId: customer.id,
  //       paymentType: 'paid',
  //     }
  //   )

  //   return user
  // }
}
