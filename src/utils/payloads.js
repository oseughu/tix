import mongoose from 'mongoose'

export const userPayload = {
  type: 'personal',
  country: 'Nigeria',
  firstName: 'Kanu',
  lastName: 'Nwankwo',
  email: 'test@test.com',
  password: '1234567890',
  testId: new mongoose.Types.ObjectId().toString()
}

export const loginPayload = {
  email: 'test@test.com',
  password: '1234567890'
}

export const eventPayload = {
  type: 'live',
  name: 'Free Event',
  description: 'this is a free event',
  location: 'Nairobi',
  locationTips: 'this is a free event',
  customUrl: 'free-event',
  startDate: '2020-01-01',
  endDate: '2020-01-03',
  user: userPayload.testId,
  testId: new mongoose.Types.ObjectId().toString()
}

export const editedEventPayload = {
  type: 'live',
  name: 'Free Edited Event',
  description: 'this is a free edited event',
  location: 'Nairobi',
  locationTips: 'this is a free edited event',
  customUrl: 'free-edited-event',
  startDate: '2020-01-01',
  endDate: '2020-01-03',
  user: userPayload.testId,
  testId: new mongoose.Types.ObjectId().toString()
}

export const ticketPayload = {
  type: 'free',
  name: 'Free Ticket',
  description: 'this is a free ticket',
  limit: 1,
  event: eventPayload.testId,
  testId: new mongoose.Types.ObjectId().toString()
}
