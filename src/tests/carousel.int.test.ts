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

describe('Carousel API', () => {
  let id: string

  it('should create a carousel item ', async () => {
    const res = await request(app).post('/api/carousel').set('Cookie', `token=${token}`).send({
      title: 'test1',
      subtitle: 'test1test1',
      image: 'https://via.placeholder.com',
      link1: 'https://example.com/test1-page',
      link2: 'https://example.com/test2-page',
    })

    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should fetch all carousel items', async () => {
    const res = await request(app).get('/api/carousel')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update carousel item ', async () => {
    const res = await request(app).put(`/api/carousel/${id}`).set('Cookie', `token=${token}`).send({
      title: 'test1',
      subtitle: 'test1test1',
      image: 'https://via.placeholder.com',
    })

    expect(res.status).toBe(200)
    expect(res.body.title).toBe('test1')
  })

  it('should delete carousel item', async () => {
    const res = await request(app).delete(`/api/carousel/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel deleted successfully')
  })
})
