import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'
import Blog from '../models/Blog'

let token: string
let id: string
let blogId: string
let commentId: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token

  const blog = await Blog.create({
    title: 'Test Blog',
    category: 'Test Category',
    content: 'Test Content',
    author: 'Test Author',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    subTitle: 'Test SubTitle',
    socialLinks: [
      'https://www.facebook.com',
      'https://www.twitter.com',
      'https://www.instagram.com',
    ],
    lawWays: 'Test Law Way',
    tags: ['Test Tag', 'Test Tag 2', 'Test Tag 3'],
    slug: 'test-blog',
  })
  blogId = blog._id.toString()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Comments API', () => {
  it('should allow user to create a top level comment', async () => {
    const res = await request(app).post(`/api/comments/${blogId}`).send({
      name: 'Test Name',
      email: 'test@test.com',
      content: 'Test Comment',
    })
    expect(res.status).toBe(201)
    expect(res.body.comment).toHaveProperty('_id')
    expect(res.body.comment.content).toBe('Test Comment')
    commentId = res.body.comment._id
  })

  it('should allow user to create a reply to a comment', async () => {
    const res = await request(app).post(`/api/comments/${blogId}`).send({
      name: 'John Doe',
      email: 'john@doe.com',
      content: 'Test Comment',
      parentId: commentId,
    })
    expect(res.status).toBe(201)
    expect(res.body.comment).toHaveProperty('_id')
    expect(res.body.comment.content).toBe('Test Comment')
    expect(res.body.comment.parentId).toBe(commentId)
  })

  it('should return all comments for a blog with replies', async () => {
    const res = await request(app).get(`/api/comments/${blogId}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)

    const topLevel = res.body.find((comment: any) => !comment.parentId)
    expect(topLevel?._id).toBe(commentId)
    expect(topLevel?.replies?.length).toBeGreaterThan(0)

    const reply = topLevel?.replies[0]
    expect(reply?._id).toBeDefined()
    expect(reply?.parentId).toBe(commentId)
  })

  it('should allow admin to delete a comment', async () => {
    const res = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Comment deleted successfully')

    const check = await request(app).get(`/api/comments/${commentId}`)
    const deletedComment = check.body.find((comment: any) => comment._id === commentId)
    expect(deletedComment).toBeUndefined()
  })
})
