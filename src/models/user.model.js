import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['personal', 'organization'],
      required: true
    },
    country: {
      type: String,
      enum: ['Nigeria', 'Ghana', 'South Africa'],
      required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      match: /.+\@.+\..+/,
      required: true
    },
    password: { type: String, required: true },
    testId: String
  },
  {
    timestamps: true
  }
)

export const User = model('User', userSchema)
