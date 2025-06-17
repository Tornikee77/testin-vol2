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

describe('Team API', () => {
  let id: string

  it('should create a team member', async () => {
    const res = await request(app)
      .post('/api/team')
      .set('Cookie', `token=${token}`)
      .send({
        name: 'test1test2test3',
        position: 'CEO',
        email: 'test1test2test3@gmail.com',
        image: 'https://www.linkedin.com/',
        services: ['test1test2test3', 'test1test2test3', 'test1test2test3'],
      })

    expect(res.status).toBe(201)

    id = res.body.createdMember._id
  })

  it('should get all team members', async () => {
    const res = await request(app).get(`/api/team`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should get a team member', async () => {
    const res = await request(app).get(`/api/team/${id}`)

    expect(res.body).toHaveProperty('name')
    expect(res.status).toBe(200)
  })

  it('should update a team member', async () => {
    const res = await request(app).put(`/api/team/${id}`).set('Cookie', `token=${token}`).send({
      name: 'test1',
      position: 'CEO23',
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Member updated successfully')
  })

  it('should delete a team member', async () => {
    const res = await request(app).delete(`/api/team/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Member deleted successfully')
  })
})
