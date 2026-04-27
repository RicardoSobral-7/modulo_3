// o ideal seria criar uma pasta de erros e colocar os erros que se é sabido, dentro delas, um para cada erro
export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("Max number of check in reached.")
  }
}