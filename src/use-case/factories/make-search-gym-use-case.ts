import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymUseCase() {
  const gymsRepository = new PrismaGymRepository()

  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}