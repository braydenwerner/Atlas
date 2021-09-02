import 'reflect-metadata'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { Storage } from '@google-cloud/storage'
import { graphqlUploadExpress } from 'graphql-upload'
import { createConnection } from 'typeorm'

import { __prod__ } from './constants/constants'
import { ImageResolver, UserResolver, TodoResolver } from './Resolvers/index'
import {
  Drawing,
  Image,
  Note,
  Todo,
  UserAccount,
  Video,
} from './Entities/index'
import { NoteResolver } from './Resolvers/note'
import { VideoResolver } from './Resolvers/video'
import { DrawingResolver } from './Resolvers/drawing'

require('dotenv').config()

//  get storage credentials from .env instead of json file
const keysEnvVar = process.env['STORAGE_CREDS']
if (!keysEnvVar) {
  throw new Error('The $STORAGE_CREDS environment variable was not found!')
}
const keys = JSON.parse(keysEnvVar)

const gc = new Storage({
  projectId: 'chrome-extension-images',
  credentials: {
    client_email: keys.client_email,
    private_key: keys.private_key,
  },
})
export const bucket = gc.bucket('chrome-extension-bucket')

const main = async () => {
  /*const conn = */ await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [Image, Todo, UserAccount, Note, Video, Drawing],
    migrations: [path.join(__dirname, './migrations/*')],
    ssl: {
      rejectUnauthorized: false,
    },
  })
  //  await conn.runMigrations()

  const app = express()

  app.use(cors())
  app.set('trust proxy', 1)
  app.use(
    //  1 MB * 10 * 2 = 20MB
    graphqlUploadExpress({ maxFileSize: 1048576 * 10 * 2, maxFiles: 10 })
  )
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb' }))

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        ImageResolver,
        UserResolver,
        TodoResolver,
        NoteResolver,
        VideoResolver,
        DrawingResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    uploads: false,
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/',
  })

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`server started on localhost:${process.env.PORT!}`)
  })
}
main()
