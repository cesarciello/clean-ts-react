import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: UpdateCurrentAccount.Params) => void
  getCurrentAccount?: () => UpdateCurrentAccount.Params
}

export default createContext<Props>(null)
