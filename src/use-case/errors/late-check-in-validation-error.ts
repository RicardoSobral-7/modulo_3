// o ideal seria criar uma pasta de erros e colocar os erros que se é sabido, dentro delas, um para cada erro
export class LateCheckInValidationError extends Error {
  constructor() {
    super("The check in can only be validated until 20 minutes of its creation.")
  }
}