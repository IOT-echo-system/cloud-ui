export interface ServerError extends Error {
  errorCode: string
  message: string
}
