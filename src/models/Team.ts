import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    bio: {
      type: String,
    },

    services: [{ type: String }],
  },
  { timestamps: true },
)


const Team = mongoose.model("Team",teamSchema)

export default Team