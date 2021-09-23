import * as jwt from 'jsonwebtoken'
import Stripe from 'stripe'

import { MyContext } from './types'
import { __prod__ } from './constants/constants'

export const stripe = new Stripe(
  __prod__ ? process.env.STRIPE_SECRET_PROD! : process.env.STRIPE_SECRET_TEST!,
  {
    apiVersion: '2020-08-27',
    typescript: true,
  }
)

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
