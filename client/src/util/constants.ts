export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const isToday = (date: number) => {
  const today = new Date()
  const day = new Date(date)

  return day.toISOString().substr(0, 10) == today.toISOString().substr(0, 10)
}

export const MAX_EDITOR_CHARACTER_COUNT = 20000

export const MAX_NUMBER_NOTES = 100

export const MAX_FILE_SIZE = 1048576 * 10 * 2 //  1 MB * 10 * 2 = 20MB
