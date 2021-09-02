import {
  useContext,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { OtherSettingsContext } from '../../../providers'
import { getWeatherData } from '../../../api/WeatherAPI'
import { DynamicContainer } from '../../modules/index'
import * as Styled from './WeatherWidget.styled'

interface WeatherType {
  temperatureC: number
  temperatureF: number
  description: string
  city: string
}

export const WeatherWidget: React.FC = () => {
  const { containerColor } = useContext(OtherSettingsContext)

  const [weather, setWeather] = useState<WeatherType>()
  const [errors, setErrors] = useState(false)
  const [fetching, setFetching] = useState(false)

  const [city, setCity] = useLocalStorage('city', '')
  const [usingFahrenheit, setUsingFahrenheit] = useLocalStorage(
    'usingFahrenheight',
    true
  )

  const formRef = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    fetchWeather()
  }, [city])

  const fetchWeather = async () => {
    if (city) {
      setFetching(true)
      const { data, errors } = await getWeatherData(city)

      if (data && errors.length === 0) {
        setWeather({
          temperatureC: data.minutely[data.minutely.length - 1].temp,
          temperatureF: Math.round(
            ((data.minutely[data.minutely.length - 1].temp * 1.8 + 32) * 100) /
              100
          ),
          description: data.data[0].weather.description,
          city: data.data[0].city_name,
        })
      }

      if (errors?.length > 0) {
        setCity('')
        setErrors(true)
      }

      setFetching(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef || !formRef.current) return

    setCity(formRef.current.value)

    formRef.current.value = ''
  }

  return (
    <>
      {!fetching && (
        <DynamicContainer
          nodeTitle="WeatherWidget"
          defaultLocation={{ x: 0.885, y: 0.7 }}
        >
          <Styled.WeatherWidgetContainer containerColor={containerColor}>
            <Styled.WeatherWidgetHeader>Weather</Styled.WeatherWidgetHeader>
            {weather ? (
              <>
                <Styled.WeatherWidgetRow>
                  <Styled.WeatherWidgetItem>
                    {weather.city}
                  </Styled.WeatherWidgetItem>
                  <Styled.WeatherWidgetItem>
                    {weather.description}
                  </Styled.WeatherWidgetItem>
                  <Styled.WeatherWidgetItem>
                    {usingFahrenheit
                      ? weather.temperatureF + '°F'
                      : weather.temperatureC + '°C'}
                  </Styled.WeatherWidgetItem>
                </Styled.WeatherWidgetRow>
                <Styled.IconWrapper>
                  <Styled.RefetchIcon onClick={fetchWeather} size={32} />
                  <Styled.TemperatureIcon
                    onClick={() =>
                      setUsingFahrenheit(
                        (oldUsingFahrenheight) => !oldUsingFahrenheight
                      )
                    }
                    size={32}
                  />
                  <Styled.BackIcon
                    size={32}
                    onClick={() => {
                      setWeather(undefined)
                      setCity('')
                    }}
                  />
                </Styled.IconWrapper>
              </>
            ) : (
              city.length === 0 && (
                <form onSubmit={handleFormSubmit}>
                  <Styled.Input
                    ref={formRef}
                    placeholder="Enter your city"
                    containerColor={containerColor}
                  />
                </form>
              )
            )}
          </Styled.WeatherWidgetContainer>
        </DynamicContainer>
      )}
      <Snackbar
        open={errors}
        autoHideDuration={4000}
        onClose={() => setErrors(false)}
      >
        <Alert severity="error">There was an error finding your city.</Alert>
      </Snackbar>
    </>
  )
}
