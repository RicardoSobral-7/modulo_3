import { UsersRepository } from "@/repositories/users-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

// describe sempre iremos colocar o nome do que estamos testando, no caso estamos testando o usecase de registro
describe("Register Use Case", () => {
  it("Should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUseCase(usersRepository);

    const { user } = await registerUsecase.execute({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    // aqui vamos verificar algo que retorna somente se der certo, no caso o id do usuario
    expect(user.id).toEqual(expect.any(String));
  });

  // no it sempre iremos colocar o que esperamos testar, ou o que aconteça
  it("Should hash user password upon registration", async () => {
    // teste unitários não devem ter dependencias externas, ao utilizarmos o repository estamos criando teste de integração
    // const userRepository = new UsersRepository();

    //  aqui simulamos o repository, pois no fim é uma classe com metodos, o repository fake é para ser rapido e testarmos o que precisamos
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUseCase(usersRepository);

    const { user } = await registerUsecase.execute({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    // aqui é o resultado que esperamos, para passar no teste, o hashed precisa ser igual
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not to be albe to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUseCase(usersRepository);

    const email = "johndoe@exemple.com";

    await registerUsecase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    // toda vez que tiver uma promise dentro do expect nào esquecer o await antes do expect
    await expect(() =>
      registerUsecase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
