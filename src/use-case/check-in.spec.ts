import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

// quando tratarmos de datas nos testes é importante a gente usar o mockador de datas do vitest, ele irá garantir que a data seja sempre a setada, evitando problemas 


describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymRepository
    sut = new CheckInUseCase(checkInsRepository, gymRepository)

    // como a academia é algo que vai se repetir ao longo dos testes podemos cria-la aqui no before each
    gymRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: "",
      latitude: new Decimal(-22.9171004),
      longitude: new Decimal(-46.5520027)
    })

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
      userId: 'user-01',
      userLatitude: -22.9171004,
      userLongitude: -46.5520027
    })

    expect(checkIn.id).toEqual(expect.any(String))
  });

  it("Should not be able to check in twice in the same day", async () => {
    // seta na mão a data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9171004,
      userLongitude: -46.5520027
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.9171004,
        userLongitude: -46.5520027
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it("Should not be able to check in twice in the different days", async () => {
    // seta na mão a data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9171004,
      userLongitude: -46.5520027
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.9171004,
        userLongitude: -46.5520027
      })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("Should not be able to check in on distant gym", async () => {

    gymRepository.items.push({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: '',
      phone: "",
      latitude: new Decimal(-22.916566064261957),
      longitude: new Decimal(-46.54629293564518)
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.9171004,
        userLongitude: -46.5520027
      })
    ).rejects.toBeInstanceOf(Error)

  });
});
