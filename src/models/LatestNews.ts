import mongoose from 'mongoose'

const latestNewsSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)


const LatestNews = mongoose.model('LatestNews', latestNewsSchema)

export default LatestNews
