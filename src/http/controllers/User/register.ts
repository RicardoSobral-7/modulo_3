import { registerUseCase } from '@/use-case/User/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({ email, name, password })
  } catch (error) {
    reply.status(409).send()
  }

  reply.status(201).send()
}
