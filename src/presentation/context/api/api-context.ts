import { createContext } from 'react'

import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

type Props = {
  setCurrentAccount?: (account: UpdateCurrentAccount.Params) => void
  getCurrentAccount?: () => UpdateCurrentAccount.Params
}

export default createContext<Props>(null)
