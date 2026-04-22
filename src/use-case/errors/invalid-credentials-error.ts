// o ideal seria criar uma pasta de erros e colocar os erros que se é sabido, dentro delas, um para cada erro
export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.")
  }
}