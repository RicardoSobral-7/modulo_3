import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "../interfaces/users-repository";

// aqui é onde vamos criar a parte fake, vamos guardar informações em memorias e fazer de conta que ta batendo no banco, estamos usando o js puro para isso
export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
