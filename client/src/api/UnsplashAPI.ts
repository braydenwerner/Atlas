export const getWallpaperData = async () => {
  let data
  const errors = []

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?topics=bo8jQKTaE0Y&client_id=rXxuDml6db8UP_Q_GpxtCKYUdKxTs709u9hP-KVR3kY`
    )
    data = await res.json().catch((err: string) => errors.push(err))
  } catch (err) {
    errors.push(err)
  }

  return { data, errors }
}
