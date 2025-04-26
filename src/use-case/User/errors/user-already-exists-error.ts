// o ideal seria criar uma pasta de erros e colocar os erros que se é sabido, dentro delas, um para cada erro
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists!")
  }
}