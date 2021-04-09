import { createContext } from 'react'

type Props = {
  onChangeAnswer: (answer: string) => void
}

export default createContext<Props>(null)
