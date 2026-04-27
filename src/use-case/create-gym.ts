import { GymsRepositoryInterface } from "@/repositories/interfaces/gyms-repository";
import { Gym, User } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) { }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    });

    return { gym };
  }
}
