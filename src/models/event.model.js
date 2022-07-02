import mongoose from 'mongoose'

const { Schema, model } = mongoose

const eventSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['live', 'online'],
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: String,
      required: true
    },
    locationTips: String,
    customUrl: String,
    category: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    socialDetails: {
      website: String,
      facebook: String,
      twitter: String,
      instagram: String
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    testId: String
  },
  {
    timestamps: true
  }
)

export const Event = model('Event', eventSchema)
