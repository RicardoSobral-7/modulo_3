import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hashSync } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resoucer-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;


describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("Should be able to get user profile", async () => {

    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password_hash: await hashSync("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("Should not be able to get user profile with wrong id", async () => {

    expect(() =>
      sut.execute({ userId: "non-existing-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  });
});
