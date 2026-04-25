import { Gym } from "@prisma/client";

// a interface é o contrato que a classe repository vai ter que seguir
export interface GymRepositoryInterface {
  findById(id: string): Promise<Gym | null>
}
