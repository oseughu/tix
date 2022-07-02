import { routes } from '#routes'
import { connectDb } from '#utils/db'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import session from 'express-session'

const port = process.env.PORT || 3000

connectDb()

export const createServer = () => {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  //Use express-session to save cookies and user data
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true
    })
  )

  app.use(routes)

  return app
}

const app = createServer()

app.listen(port, () => {
  console.log('Server started successfully. Connected to MongoDB.')
})
