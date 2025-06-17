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

describe('Banner API', () => {
  let id: string

  it('should create a banner item', async () => {
    const res = await request(app).post('/api/banner').set('Cookie', `token=${token}`).send({
      title: 'test1',
      image: 'https://via.placeholder.com',
      link: 'https://example.com/test1-page',
      revenue: '850k+',
    })

    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should fetch all banner items', async () => {
    const res = await request(app).get('/api/banner')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update all banner items', async () => {
    const res = await request(app).put(`/api/banner/${id}`).set('Cookie', `token=${token}`).send({
      title: 'test1',
      link:"https://example.com/test2-page",
      image: 'https://via.placeholder.com',
    })
    expect(res.status).toBe(200)
  })

  it('should delete banner item', async () => {
const res = await request(app).delete(`/api/banner/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Banner  deleted  successfully ')
  })
})
