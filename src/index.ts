import dotenv from 'dotenv'
import connectDB from './config/db'
dotenv.config()

import app from './server'
import { setupSwagger } from './config/swagger'

const PORT = process.env.PORT || 4000

const startServer = async () => {
  await connectDB()
  setupSwagger(app)
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}

startServer()
