import { GymsRepositoryInterface } from "@/repositories/interfaces/gyms-repository";
import { Gym, User } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
  latitude: number;
  longitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) { }

  async execute({
    latitude,
    longitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {

    const gyms = await this.gymsRepository.findManyNearby({
      latitude,
      longitude
    }
    );

    return { gyms };
  }
}
