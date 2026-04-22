import { UsersRepository } from "@/repositories/users-repository";
import { AuthenticateUseCase } from "@/use-case/authenticate";
import { InvalidCredentialsError } from "@/use-case/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function autenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const authenticateUserCase = new AuthenticateUseCase(usersRepository);

    await authenticateUserCase.execute({ email, password });
  } catch (error) {

    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    return reply.status(500).send();
  }

  return reply.status(200).send();
}
