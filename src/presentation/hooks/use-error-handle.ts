import { useContext } from 'react'
import { useHistory } from 'react-router'

import { AccessDeniedError } from '@/domain/errors'
import ApiContext from '@/presentation/context/api/api-context'

type Callback = (error: Error) => void
type Result = Callback

export const useErrorHandler = (callback: Callback): Result => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      history.replace('/login')
      setCurrentAccount(null)
    } else {
      callback(error)
    }
  }
}
