import mongoose from 'mongoose'

const { Schema, model } = mongoose

const ticketSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['free', 'paid', 'invite only'],
      default: 'free'
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: Number,
    limit: { type: Number, required: true, min: 1, max: 5 },
    perks: [String],
    price: Number,
    guestFee: { type: Boolean, default: false },
    testId: String
  },
  {
    timestamps: true
  }
)

export const Ticket = model('Ticket', ticketSchema)
