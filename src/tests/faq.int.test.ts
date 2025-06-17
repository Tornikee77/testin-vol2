import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('FAQ API', () => {
  let id: string
  it('should create a new faq', async () => {
    const res = await request(app)
      .post('/api/faq')
      .send({
        question: 'What is the capital of France?',
        answer: 'Paris',
      })
      .set('Cookie', `token=${token}`)

    expect(res.status).toBe(201)

    id = res.body.faq._id
  })

  it('should get all faqs', async () => {
    const res = await request(app).get('/api/faq')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update a faq', async () => {
    const res = await request(app)
      .put(`/api/faq/${id}`)
      .send({
        question: 'What is the capital of America?',
        answer: 'Washington',
      })
      .set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Faq updated successfully')
  })

  it('should delete a faq', async () => {
    const res = await request(app).delete(`/api/faq/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Faq deleted successfully')
  })
})
