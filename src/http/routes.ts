import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { autenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', autenticate)
}
