import { Gym, Prisma } from "@prisma/client";

// a interface é o contrato que a classe repository vai ter que seguir

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number
}
export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
