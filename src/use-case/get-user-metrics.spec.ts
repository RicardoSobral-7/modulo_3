import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to fetch check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01'
    })


    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  });
});
