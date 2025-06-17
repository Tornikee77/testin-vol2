import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string
let blogId: string
let slug: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Blog API', () => {
  it('should create a blog', async () => {
    const res = await request(app)
      .post('/api/blog')
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Blog',
        content: 'This is a test blog',
        author: 'Test Author',
        category: 'Test Category',
        tags: ['test', 'blog'],
        images: ['https://via.placeholder.com/150'],
        subtitle: 'Test Subtitle',
        socialLinks: ['https://www.facebook.com/test', 'https://www.twitter.com/test'],
        lawWays: 'Test Law Way',
      })

    expect(res.status).toBe(201)
    blogId = res.body.blog._id
    slug = res.body.blog.slug
  })

  it('should get all blogs', async () => {
    const res = await request(app).get('/api/blog')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(false)
  })

  it('should get a blog by slug', async () => {
    const res = await request(app).get(`/api/blog/${slug}`)
    expect(res.status).toBe(200)
    expect(res.body.blog.slug).toBe(slug)
  })

  it('should update a blog', async () => {
    const res = await request(app).put(`/api/blog/${blogId}`).set('Cookie', `token=${token}`).send({
      title: 'Updated Blog',
      content: 'This is an updated blog',
    })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Blog updated successfully')
  })

  it('should delete a blog', async () => {
    const res = await request(app).delete(`/api/blog/${blogId}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Blog deleted successfully')
  })
})
