export interface ServerError extends Error {
  errorCode: string
  errorMessage: string
}
