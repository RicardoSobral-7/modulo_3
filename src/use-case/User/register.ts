import { UsersRepositoryInterface } from "@/repositories/interfaces/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
// cada classe de caso de uso terá apenas um unico metodo

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  // para já instanciarmos direto sem precisar declarar ai colocar this. tal coisa, no javascript só colocar-mos direto o private no parametro do contructor
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      // aqui colocamos o erro que criamos
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    // sempre retornar como objeto pois pode aumentar a quantidade de dados no futuro
    return { user };
  }
}
