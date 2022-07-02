import { eventRouter } from '#routes/event.route'
import { ticketRouter } from '#routes/ticket.route'
import { userRouter } from '#routes/user.route'
import { Router } from 'express'

export const routes = Router()

routes.use(userRouter, eventRouter, ticketRouter)
