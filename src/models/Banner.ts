import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    revenue: {
      type: String,
    },
  },
  { timestamps: true },
)

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
