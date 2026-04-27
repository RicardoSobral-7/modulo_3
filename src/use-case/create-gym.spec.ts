import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase

describe("CreateGym Use Case", () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  })

  it("Should be able to creategym", async () => {


    const { gym } = await sut.execute({
      title: "Typrescript Gym",
      description: null,
      phone: null,
      latitude: -22.9171004,
      longitude: -46.5520027
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
