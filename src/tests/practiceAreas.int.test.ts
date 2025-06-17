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

describe('Practice Areas API ', () => {
  let id: string

  it('should create a Area ', async () => {
    const res = await request(app).post('/api/practiceareas').set('Cookie', `token=${token}`).send({
      topic: 'Family Law',
      numeration: '01',
      title: 'Child Custody',
      image: 'https://example.com/image.jpg',
      text: 'This is an explanation of child custody laws.',
      link: 'https://example.com/details',
    })

    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should get all areas', async () => {
    const res = await request(app).get('/api/practiceareas')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update a area item ', async () => {
    const res = await request(app)
      .put(`/api/practiceareas/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        topic: 'Family',
        numeration: '04',
        title: 'Child ',
      })
    expect(res.status).toBe(200)

    expect(res.body.message).toBe('Area items updated successfully')
  })

  it('should delete a area item ', async () => {
    const res = await request(app)
      .delete(`/api/practiceareas/${id}`)
      .set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Area deleted successfully')
  })
})
