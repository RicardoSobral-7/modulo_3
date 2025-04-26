import { Prisma, User } from "@prisma/client";

// a interface é o contrato que a classe repository vai ter que seguir
export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
