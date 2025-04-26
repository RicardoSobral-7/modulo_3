import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUseCase } from "@/use-case/User/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    // lembrar do padrão sempre que for classe letra maiuscula quando instanciarmos numa variavel passar para minuscula
    const usersRepository = new UsersRepository();
    // agora invertemos a dependência, o repository por si, trabalha sozinho e passamos ao use case ele como constructor para criar a intancia dessa classe
    const registerUseCase = new RegisterUseCase(usersRepository);

    // o execute é o unico método que existe dentro do use case, e  havera um execute em cada use case
    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    reply.status(409).send();
  }

  reply.status(201).send();
}
