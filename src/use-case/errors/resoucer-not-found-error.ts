// o ideal seria criar uma pasta de erros e colocar os erros que se é sabido, dentro delas, um para cada erro
export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource not found.")
  }
}