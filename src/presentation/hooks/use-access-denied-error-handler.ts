
import { useLogout } from './use-logout'
import { AccessDeniedError } from '@/domain/errors'

type Callback = (error: Error) => void
type Result = Callback

export const useAccessDeniedErrorHandler = (callback: Callback): Result => {
  const logout = useLogout()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
