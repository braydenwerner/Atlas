export const getWeatherData = async (city: string) => {
  let data
  const errors = []
  try {
    const res = await fetch(
      `https://api.weatherbit.io/v2.0/current?&city=${city}&country=US&key=${process.env.REACT_APP_WEATHER_API_KEY}&include=minutely`
    )
    data = await res.json().catch((err: string) => errors.push(err))
  } catch (err) {
    errors.push(err)
  }

  return { data, errors }
}
