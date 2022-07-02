import { Event } from '#models/event.model'
import { createServer } from '#src/app'
import { eventPayload, ticketPayload } from '#utils/payloads'
import mongoose from 'mongoose'
import supertest from 'supertest'

const app = createServer()

describe('Tickets', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done()
    })
  })

  it('should create a ticket for an event on /event/<eventId>/tickets/create POST', (done) => {
    const newEvent = new Event(eventPayload)

    newEvent.save().then(() => {
      supertest(app)
        .post(`/event/${newEvent.testId}/tickets/create`)
        .send(ticketPayload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      done()
    })
  })
})
