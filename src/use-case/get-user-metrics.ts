import { CheckInsRepositoryInterface, } from "@/repositories/interfaces/check-ins-repository";

import { CheckIn } from "@prisma/client";


interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepositoryInterface
  ) { }

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);


    return {
      checkInsCount
    }
  }
}