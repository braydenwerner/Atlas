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
import { Image } from '../Entities/index'
import { bucket } from '../index'
import { getUserId } from '../utils'
import { MAX_IMAGE_UPLOADS } from '../constants/constants'

@ObjectType()
class ImageResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => [Image], { nullable: true })
  images?: [Image]
}

@Resolver()
export class ImageResolver {
  @Query(() => [Image], { nullable: true })
  getImages(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return Image.find({ where: { uid } })
  }

  @Mutation(() => ImageResponse, { nullable: true })
  async uploadImages(
    @Ctx() ctx: MyContext,
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload]
  ) {
    const uid = getUserId(ctx)

    const images: Image[] = []

    let numImages = await getConnection().query(
      `SELECT COUNT(*) FROM image WHERE uid='${uid}'`
    )

    for (const file of files) {
      if (numImages[0].count >= MAX_IMAGE_UPLOADS) {
        return {
          errors: [
            {
              field: 'uploadImages',
              message: `You have exceeded the maximum of ${MAX_IMAGE_UPLOADS} images uploaded`,
            },
          ],
        }
      }
      numImages[0].count++

      const { createReadStream, filename, mimetype } = await file

      let id = uuid()
      if (mimetype === 'image/png') id += '.png'
      else if (mimetype === 'image/jpeg') id += '.jpeg'
      else return { field: 'uploadFiles', message: 'Invalid image type' }

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
        images.push(
          await Image.create({
            uid,
            title: filename,
            URL: `https://storage.googleapis.com/chrome-extension-bucket/${id}`,
          }).save()
        )
      } catch (err) {
        return { errors: [{ field: 'uploadImages', message: err }] }
      }
    }
    return { images }
  }

  @Mutation(() => ImageResponse, { nullable: true })
  async deleteImages(
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

        await Image.delete({ uid, URL: url }).then(
          (response) => response.raw[0]
        )
      } catch (err) {
        return { errors: [{ field: 'deleteImages', message: err }] }
      }
    }
    return null
  }

  @Mutation(() => Boolean, { nullable: true })
  updateImages(
    @Ctx() ctx: MyContext,
    @Arg('ids', () => [Int]) ids: number[],
    @Arg('isFavoriteArr', () => [Boolean]) isFavoriteArr: boolean[]
  ) {
    const uid = getUserId(ctx)

    for (let i = 0; i < ids.length; i++) {
      Image.update(
        { id: ids[i], uid },
        {
          isFavorite: isFavoriteArr[i],
        }
      )
    }
    return true
  }
}
