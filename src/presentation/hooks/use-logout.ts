import { useContext } from 'react'
import { useHistory } from 'react-router'

import ApiContext from '@/presentation/context/api/api-context'

type Result = () => void

export const useLogout = (): Result => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  return (): void => {
    history.replace('/login')
    setCurrentAccount(null)
  }
}
