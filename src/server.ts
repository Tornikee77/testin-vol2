import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth'
import carouselRoutes from './routes/carousel'
import bannerRoutes from './routes/banner'
import quoteRoutes from './routes/quote'
import latestNewsRoutes from './routes/latestNews'
import practiceAreaRoutes from './routes/practiceAreas'
import contactRoutes from './routes/contact'
import teamRoutes from './routes/team'
import faqRoutes from './routes/faq'
import businessRoutes from './routes/business'
import addressRoutes from './routes/address'
import blogRoutes from './routes/blog'
import commentRoutes from './routes/comments'
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.use('/api/carousel', carouselRoutes)

app.use('/api/banner', bannerRoutes)

app.use('/api/quotes', quoteRoutes)

app.use('/api/latestnews', latestNewsRoutes)

app.use('/api/practiceareas', practiceAreaRoutes)

app.use('/api/contact', contactRoutes)

app.use('/api/team', teamRoutes)

app.use('/api/faq', faqRoutes)

app.use('/api/business', businessRoutes)

app.use('/api/address', addressRoutes)

app.use('/api/blog', blogRoutes)

app.use('/api/comments', commentRoutes)
export default app
