import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div data-testid={`${props.name}-input-container`} className={Styles.inputContainer} >
      <div className={Styles.inputWrap}>
        <input {...props} placeholder=" " data-testid={props.name} className={Styles.input} onChange={handleChange} />
        <label>{props.placeholder}</label>
      </div>
      {error && <p className={Styles.errorInputMessage} data-testid={`${props.name}-error`} >{error}</p>}
    </div>
  )
}

export default Input
