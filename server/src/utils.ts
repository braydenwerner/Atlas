import * as jwt from 'jsonwebtoken'
import { MyContext } from './types'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2020-08-27',
})

export const getUserId = (ctx: MyContext) => {
  const Authorization = ctx.req.get('Authorization')
  const token = Authorization?.replace('Bearer ', '')

  if (token) {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET!) as {
      uid: string
    }
    return uid
  }
  throw new AuthError()
}

export const createToken = (uid: String) => {
  const token = jwt.sign({ uid, expiresIn: '365d' }, process.env.JWT_SECRET!)
  return token
}

export class AuthError extends Error {
  constructor() {
    super('Not Authorized')
  }
}
