import { UsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-case/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-case/factories/make-register-use-case";
import { RegisterUseCase } from "@/use-case/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase()

    // o execute é o unico método que existe dentro do use case, e  havera um execute em cada use case
    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    // agora aqui vamos ver se o erro é uma instancia do erro que criamos e soltamos o aqui com o status code

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    return reply.status(500).send();
  }

  return reply.status(201).send();
}
