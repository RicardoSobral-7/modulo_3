import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hashSync } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Autenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    // SUT sistem under test um patters pra mostrar o que estamos testando
    const sut = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    // SUT sistem under test um patters pra mostrar o que estamos testando
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() => sut.execute({
      email: "johndoe@exemple.com",
      password: "123456",
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it("Should be not able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    // SUT sistem under test um patters pra mostrar o que estamos testando
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password_hash: await hashSync("123456", 6),
    })

    expect(() => sut.execute({
      email: "johndoe@exemple.com",
      password: "1234562",
    }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
