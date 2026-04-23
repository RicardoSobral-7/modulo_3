import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hashSync } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// vamos criar as variaveis aqui fora para que possamos pegar globalmente e não ficar presa ao escopo do beforeEach, vamos criar como let e atribuir no beforeEach toda vez
let usersRepository: InMemoryUsersRepository;
// SUT sistem under test um patters pra mostrar o que estamos testando
let sut: AuthenticateUseCase;


describe("Autenticate Use Case", () => {
  // irá executar antes de cada um dos testes, utilizar o beforeeach garante que o ambiente esteja limpo e pronto pra caada 1
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })


  it("Should be able to authenticate", async () => {

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password_hash: await hashSync("123456", 6),
    })

    const { user } = await sut.execute({
      email: "johndoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should be not able to authenticate with wrong email", async () => {

    await expect(() => sut.execute({
      email: "johndoe@exemple.com",
      password: "123456",
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it("Should be not able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    // SUT system under test um patters pra mostrar o que estamos testando
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password_hash: await hashSync("123456", 6),
    })

    await expect(() => sut.execute({
      email: "johndoe@exemple.com",
      password: "1234562",
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
