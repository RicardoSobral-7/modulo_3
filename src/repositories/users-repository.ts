import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "./interfaces/users-repository";

// o repository sempre vai serguir o padrao de no meio estar o nome da entidade do banco e em sequencia o nome do repository
// toda vez que criarmos um repository, vamos criar uma interface para ele, e depois a implementação
export class UsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  // dentro da lib criaouse essa tipagem e vamos reutilzar ela aqui
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}

// trabalhando com inversão de dependência começamos a criar uma vantagem que apenas em um local tem conexão com o banco de dados e se trocarmos o ORM será só aqui que iremos mexer
