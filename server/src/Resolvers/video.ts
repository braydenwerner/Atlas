import {
  Query,
  Mutation,
  Resolver,
  Arg,
  Int,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { v4 as uuid } from 'uuid'
import { getConnection } from 'typeorm'

import { FieldError } from './FieldError'
import { MyContext } from '../types'
import { Video } from '../Entities/index'
import { bucket } from '../index'
import { getUserId } from '../utils'
import { MAX_VIDEO_UPLOADS } from '../constants/constants'

@ObjectType()
class VideoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => [Video], { nullable: true })
  Videos?: [Video]
}

@Resolver()
export class VideoResolver {
  @Query(() => [Video], { nullable: true })
  getVideos(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Video.find({ where: { uid } })
  }

  @Mutation(() => VideoResponse, { nullable: true })
  async uploadVideos(
    @Ctx() ctx: MyContext,
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload]
  ) {
    const uid = getUserId(ctx)

    const Videos: Video[] = []

    let numVideos = await getConnection().query(
      `SELECT COUNT(*) FROM Video WHERE uid='${uid}'`
    )
    console.log('numVideos: ' + numVideos[0].count)

    for (const file of files) {
      if (numVideos[0].count >= MAX_VIDEO_UPLOADS) {
        return {
          errors: [
            {
              field: 'uploadVideos',
              message: `You have exceeded the maximum of ${MAX_VIDEO_UPLOADS} videos uploaded`,
            },
          ],
        }
      }
      numVideos[0].count++

      const { createReadStream, filename, mimetype } = await file

      let id = uuid()
      if (mimetype === 'video/mp4') id += '.mp4'
      else return { field: 'uploadFiles', message: 'Invalid Video type' }

      //  write to the storage bucket
      try {
        await new Promise((res) =>
          createReadStream()
            .pipe(
              bucket.file(id).createWriteStream({
                resumable: false,
                gzip: true,
              })
            )
            .on('finish', res)
        )
        //  write to the database
        Videos.push(
          await Video.create({
            uid,
            title: filename,
            URL: `https://storage.googleapis.com/chrome-extension-bucket/${id}`,
          }).save()
        )
      } catch (err) {
        return { errors: [{ field: 'uploadVideos', message: err }] }
      }
    }
    return { Videos }
  }

  @Mutation(() => VideoResponse, { nullable: true })
  async deleteVideos(
    @Ctx() ctx: MyContext,
    @Arg('urls', () => [String]) urls: string[]
  ) {
    const uid = getUserId(ctx)

    for (const url of urls) {
      const fileName = url.split(
        'https://storage.googleapis.com/chrome-extension-bucket/'
      )[1]
      try {
        await bucket.file(fileName).delete()

        await Video.delete({ uid, URL: url }).then(
          (response) => response.raw[0]
        )
      } catch (err) {
        return { errors: [{ field: 'deleteVideos', message: err }] }
      }
    }
    return null
  }

  @Mutation(() => Boolean, { nullable: true })
  updateVideos(
    @Ctx() ctx: MyContext,
    @Arg('ids', () => [Int]) ids: number[],
    @Arg('isFavoriteArr', () => [Boolean]) isFavoriteArr: boolean[]
  ) {
    const uid = getUserId(ctx)

    for (let i = 0; i < ids.length; i++) {
      Video.update(
        { id: ids[i], uid },
        {
          isFavorite: isFavoriteArr[i],
        }
      )
    }
    return true
  }
}
