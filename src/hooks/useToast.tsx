import {useSnackbar} from 'notistack'
import type {ServerError} from '../typing/error'

export type Toast = {[P in 'success' | 'warning' | 'info']: (message: string) => void} & {
  error: (message: string | ServerError) => void
}
export const useToast = (): Toast => {
  const {enqueueSnackbar} = useSnackbar()
  const warning = (message: string) => {
    enqueueSnackbar(message, {variant: 'warning'})
  }

  const info = (message: string) => {
    enqueueSnackbar(message, {variant: 'info'})
  }

  const error = (message: string | ServerError) => {
    if (typeof message === 'string') {
      enqueueSnackbar(message, {variant: 'error'})
    } else {
      const errorCode = message.errorCode ? ` with error-code: '${message.errorCode}'` : ''
      const errorMessage = `An error occurred: '${message.message}'${errorCode}`
      enqueueSnackbar(errorMessage, {variant: 'error'})
    }
  }

  const success = (message: string) => {
    enqueueSnackbar(message, {variant: 'success'})
  }
  return {warning, info, error, success}
}
