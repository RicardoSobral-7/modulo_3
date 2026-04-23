import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

// quando tratarmos de datas nos testes é importante a gente usar o mockador de datas do vitest, ele irá garantir que a data seja sempre a setada, evitando problemas 


describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    // ativa o mock pra usar datas fakes
    vi.useFakeTimers()
  })

  afterEach(() => {
    // volta a realidade
    vi.useRealTimers()
  })

  it("Should be able to to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  });

  it("Should not be able to check in twice in the same day", async () => {
    // seta na mão a data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01'
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it("Should not be able to check in twice in the different days", async () => {
    // seta na mão a data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01'
      })

    expect(checkIn.id).toEqual(expect.any(String))
  })
});
