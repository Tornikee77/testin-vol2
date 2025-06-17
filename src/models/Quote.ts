import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Quote = mongoose.model('Quote', quoteSchema)

export default Quote
