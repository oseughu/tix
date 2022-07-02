import { User } from '#models/user.model'
import { createServer } from '#src/app'
import { loginPayload, userPayload } from '#utils/payloads'
import { assert } from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'

const app = createServer()

describe('Users', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done()
    })
  })

  it('should list a user on /user/<userId> GET', (done) => {
    const newUser = new User(userPayload)

    newUser.save().then(() => {
      supertest(app)
        .get(`/user/${newUser.testId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })

  it('should list all users on /users GET', (done) => {
    supertest(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should register a user on /signup POST', (done) => {
    supertest(app)
      .post('/signup')
      .send(userPayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  })

  it('should login a user and return JWT Token on /login POST', (done) => {
    const newUser = new User(userPayload)

    newUser.save().then(() => {
      supertest(app)
        .post('/login')
        .send(loginPayload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const token = response.body.token
          assert(response.body.message, 'Welcome to Tix!')
          assert(response.body.token, token)
        })
    })

    done()
  })
})
