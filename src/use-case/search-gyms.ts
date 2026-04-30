import { GymsRepositoryInterface } from "@/repositories/interfaces/gyms-repository";
import { Gym, User } from "@prisma/client";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) { }

  async execute({
    page,
    query
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    );

    return { gyms };
  }
}
