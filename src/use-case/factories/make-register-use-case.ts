import { UsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

// aqui utilizamos o fatory patterns, a ideia aqui é fazer com que ele crie os usecases para usarmos nos controllers,  então em algum momento a inversão de dependencias vai ficar grande
// e isso deixa que em apenas um local tome conta disso e nos só chame-os no local necessário 

export function makeRegisterUseCase() {
  // lembrar do padrão sempre que for classe letra maiuscula quando instanciarmos numa variavel passar para minuscula
  const usersRepository = new UsersRepository();
  // agora invertemos a dependência, o repository por si, trabalha sozinho e passamos ao use case ele como constructor para criar a intancia dessa classe
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase
}