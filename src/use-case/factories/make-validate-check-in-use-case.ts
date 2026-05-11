import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { CheckInValidateUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new CheckInValidateUseCase(checkInsRepository)

  return useCase
}