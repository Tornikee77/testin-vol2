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

describe('Quote API ', () => {
  let id: string

  it('should create a quote item', async () => {
    const res = await request(app).post('/api/quotes').set('Cookie', `token=${token}`).send({
      title: 'test1test2test3',
      rating: 5,
      name: 'test1test2test3123213',
      position: 'CEO',
    })



    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should get all quotes', async () => {
    const res = await request(app).get('/api/quotes')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update a quote item ', async () => {

    const res = await request(app).put(`/api/quotes/${id}`).set('Cookie', `token=${token}`).send({
      title: 'test2',
      rating: 3,
      name: 'test1',
    })
    expect(res.status).toBe(200)

    expect(res.body.message).toBe('Quote items updated successfully')
  })


  it('should delete a quote item ', async () => {
    const res = await request(app).delete(`/api/quotes/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Quote  deleted successfully')
  })
})
