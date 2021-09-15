export const dev = process.env.NODE_ENV !== 'production'

export const serverURL = dev
  ? 'http://localhost:4000'
  : 'https://innodesk-backend.herokuapp.com/'
