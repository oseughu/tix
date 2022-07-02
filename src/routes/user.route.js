import {
  getUser,
  getUsers,
  login,
  register
} from '#controllers/user.controller'
import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/users', getUsers)
userRouter.get('/user/:userId', getUser)
userRouter.post('/signup', register)
userRouter.post('/login', login)
