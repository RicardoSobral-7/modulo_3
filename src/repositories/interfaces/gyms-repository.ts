import { Gym, Prisma } from "@prisma/client";

// a interface é o contrato que a classe repository vai ter que seguir
export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
