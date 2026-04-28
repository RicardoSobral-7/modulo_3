import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

// quando tratarmos de datas nos testes é importante a gente usar o mockador de datas do vitest, ele irá garantir que a data seja sempre a setada, evitando problemas 


describe("Fetch User Check In history Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  afterEach(() => {
    // volta a realidade
    vi.useRealTimers()
  })

  it("Should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01'
    })


    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-01" }),
      expect.objectContaining({ gymId: "gym-02" })
    ])
  });

  it("Should be able to fetch paginated check-in history", async () => {

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        user_id: 'user-01'
      })
    }



    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" })
    ])
  });
});
