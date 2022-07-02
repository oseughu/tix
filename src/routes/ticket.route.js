import { createTicket } from '#controllers/ticket.controller'
import { Router } from 'express'

export const ticketRouter = Router()

ticketRouter.post('/event/:eventId/tickets/create', createTicket)
