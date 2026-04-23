import { CheckInsRepositoryInterface } from "@/repositories/interfaces/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepositoryInterface
  ) { }

  async execute({
    gymId,
    userId
  }: CheckInUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gymId
    })

    return {
      checkIn
    }
  }
}