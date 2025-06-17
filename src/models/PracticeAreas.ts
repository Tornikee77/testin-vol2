import mongoose from 'mongoose'

const practiceAreasSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  numeration: {
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
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})

export const PracticeAreas = mongoose.model('PracticeAreas', practiceAreasSchema)