import { FastifyInstance } from 'fastify'
import { Register } from './User/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', Register)
}
