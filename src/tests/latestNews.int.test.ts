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

describe('Latest News API', () => {
  let id: string

  it('create a latest news', async () => {
    const res = await request(app).post('/api/latestnews').set('Cookie', `token=${token}`).send({
      date: 'nov 6',
      title: 'test1test2',
      subtitle: 'test1test2test3',
      image: 'https://via.placeholder.com',
      link: 'https://example.com/test1-page',
    })
    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should get all latest news', async () => {
    const res = await request(app).get('/api/latestnews')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update a latest news item', async () => {
    const res = await request(app)
      .put(`/api/latestnews/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        date: 'nov 7',
        title: 'test1',
        subtitle: 'test2test3',
      })
    expect(res.status).toBe(200)

    expect(res.body.message).toBe('News  items updated successfully')
  })

  it('should delete a latest news item ', async () => {
    const res = await request(app).delete(`/api/latestnews/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('News  deleted successfully')
  })
})
