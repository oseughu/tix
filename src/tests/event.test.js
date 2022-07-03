import { Event } from '#models/event.model'
import { User } from '#models/user.model'
import { createServer } from '#src/app'
import { editedEventPayload, eventPayload, userPayload } from '#utils/payloads'
import mongoose from 'mongoose'
import supertest from 'supertest'

const app = createServer()

describe('Events', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done()
    })
  })

  it('should list all events on /events GET', (done) => {
    supertest(app)
      .get('/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should list all events by a user on /events/<userId> GET', (done) => {
    supertest(app)
      .get(`/events/${userPayload.testId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should create an event on /event/create POST', (done) => {
    const newUser = new User(userPayload)

    newUser.save().then(() => {
      supertest(app)
        .post('/event/create')
        .send(eventPayload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
    })
  })

  it('should edit an event on /event/<id> PUT', (done) => {
    const newEvent = new Event(eventPayload)

    newEvent.save().then(() => {
      supertest(app)
        .put(`/event/${newEvent.testId}`)
        .send(editedEventPayload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(204, done)
    })
  })

  it('should delete an event on /event/<id> DELETE', (done) => {
    const newEvent = new Event(eventPayload)

    newEvent.save().then(() => {
      supertest(app)
        .delete(`/event/${newEvent.testId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })
})
