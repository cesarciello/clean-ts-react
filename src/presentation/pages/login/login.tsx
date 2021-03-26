import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'

type StateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  password: string
  emailError: string
  passwordError: string
}

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    emailError: '',
    passwordError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const validEmail = validation.validate('email', state.email)
    const validPassword = validation.validate('password', state.password)
    setState({
      ...state,
      emailError: validEmail,
      passwordError: validPassword
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button disabled={(!!state.emailError || !!state.passwordError) || (!state.email || !state.password)} className={Styles.submit} data-testid="submit" type="submit">Entrar</button>
          <span className={Styles.link}>criar Conta</span>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
