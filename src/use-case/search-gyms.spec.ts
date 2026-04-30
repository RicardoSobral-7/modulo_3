import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let searchGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

// quando tratarmos de datas nos testes é importante a gente usar o mockador de datas do vitest, ele irá garantir que a data seja sempre a setada, evitando problemas 


describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    searchGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(searchGymsRepository)
  })

  afterEach(() => {
    // volta a realidade
    vi.useRealTimers()
  })

  it("Should be able to fetch check-in history", async () => {
    await searchGymsRepository.create({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -22.9171004,
      longitude: -46.5520027
    })

    await searchGymsRepository.create({
      title: 'gym-02',
      description: null,
      phone: null,
      latitude: -22.9171004,
      longitude: -46.5520027
    })


    const { gyms } = await sut.execute({
      query: "gym-01",
      page: 1
    })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-01" }),
    ])
  });

  // ao colocar o skip no it, it.skip pulamos o teste
  it.skip("Should be able to fetch paginated gym search", async () => {

    for (let i = 1; i <= 22; i++) {
      await searchGymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -22.9171004,
        longitude: -46.5520027
      })
    }



    const { gyms } = await sut.execute({
      query: "",
      page: 2
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-21" }),
      expect.objectContaining({ title: "gym-22" })
    ])
  });
});
