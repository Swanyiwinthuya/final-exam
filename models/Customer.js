import { Schema, models, model } from 'mongoose'

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    memberNumber: { type: Number, index: true },
    interests: { type: String, default: '' },
  },
  { timestamps: true }
)

export default models.Customer || model('Customer', CustomerSchema)