import { CheckInsRepositoryInterface } from "@/repositories/interfaces/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resoucer-not-found-error";
import dayjs from "dayjs";

interface CheckInValidateUseCaseRequest {
  checkInId: string;
}

interface CheckInValidateValidateUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInValidateUseCase {
  constructor(
    private checkInRepository: CheckInsRepositoryInterface,
  ) { }

  async execute({
    checkInId
  }: CheckInValidateUseCaseRequest): Promise<CheckInValidateValidateUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    // sempre calcular o diff com uma data do futuro menos uma data do passado se não da negativo a conta
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn
    }
  }
}