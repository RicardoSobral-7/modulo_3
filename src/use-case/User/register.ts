import { prisma } from "@/lib/prisma";
import { UsersRepositoryInterface } from "@/repositories/interfaces/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
// cada classe de caso de uso terá apenas um unico metodo

export class RegisterUseCase {
  // para já instanciarmos direto sem precisar declarar ai colocar this. tal coisa, no javascript só colocar-mos direto o private no parametro do contructor
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists!");
    }

    await this.usersRepository.create({
      name,
      email,    
      password_hash,
    });
  }
}
