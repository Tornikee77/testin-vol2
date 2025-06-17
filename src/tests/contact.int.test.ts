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

describe('Contact API', () => {
  it('should create a new contact', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'test1',
      email: 'test1test1@gmail.com',
      phone: '+5659860456',
      message: 'dapsdkaspdokaspodpkasdjdas',
    })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Contact sent successfully')
  })

  it('should return paginated results', async () => {
    const res = await request(app)
      .get('/api/contact?page=1&limit=2')
      .set('Cookie', `token=${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('total')
    expect(res.body).toHaveProperty('page')
  })

  it('should fail with invalid email', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'test1',
      email: 'invalid email',
      phone: '+5659860456',
      message: 'dapsdkaspdokaspodpkasdjdas',
    })

    expect(res.statusCode).toBe(400)
  })
})
