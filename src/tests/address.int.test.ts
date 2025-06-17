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

describe('Address API', () => {
  let addressId: string

  it('should create an address', async () => {
    const res = await request(app).post('/api/address').set('Cookie', `token=${token}`).send({
      address: '123 Main St',
      city: 'London',
      email: 'test@test.com',
      phone: '+1234567890',
    })
    expect(res.status).toBe(201)
    addressId = res.body.address._id
  })

  it('should get all addresses', async () => {
    const res = await request(app).get('/api/address')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0]).toHaveProperty('address')
    expect(res.body[0]).toHaveProperty('city')
    expect(res.body[0]).toHaveProperty('email')
    expect(res.body[0]).toHaveProperty('phone')
  })

  it('should update an address', async () => {
    const res = await request(app)
      .put(`/api/address/${addressId}`)
      .set('Cookie', `token=${token}`)
      .send({
        address: '123 Main St',
        city: 'Anytown',
      })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Address updated successfully')
  })

  it('should delete an address', async () => {
    const res = await request(app)
      .delete(`/api/address/${addressId}`)
      .set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Address deleted successfully')
  })
})
