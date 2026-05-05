import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInValidateUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resoucer-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInValidateUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInValidateUseCase(checkInsRepository)



    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  });

  it("Should not be able to validate an inexistent check-in", async () => {

    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)


  });

  it("Should not be able to validate the check-in after 20 minutes of its creation", async () => {
    // vai funcionar pra primeira função essa data 
    vi.setSystemTime(new Date(2026, 4, 2, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01'
    })

    const twentyOnMinutesInMs = 1000 * 60 * 21
    // vamos avançar o tempo na função para testar
    vi.advanceTimersByTime(twentyOnMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(Error)

  });
});
