import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  return (
    <input {...props} data-testid={props.name} className={Styles.input} onChange={handleChange} />
  )
}

export default Input
