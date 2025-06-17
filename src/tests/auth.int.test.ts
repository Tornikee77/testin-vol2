import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Auth API', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'test1234'

  it('should register an admin', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: testEmail,
      password: testPassword,
    })
    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Admin registered successfully')
  })

  it('should login as admin', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Admin logged  in successfully')
  })

  it('should not log in with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'wrongPassword',
    })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })
})
