import {
  createEvent,
  deleteEvent,
  editEvent,
  getEvents,
  getUserEvents
} from '#controllers/event.controller'
import { Router } from 'express'

export const eventRouter = Router()

eventRouter.get('/events', getEvents)
eventRouter.get('/events/:userId', getUserEvents)
eventRouter.post('/event/create', createEvent)
eventRouter.put('/event/:id', editEvent)
eventRouter.delete('/event/:id', deleteEvent)
