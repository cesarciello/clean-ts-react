import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Styles from './login-styles.scss'
import { Authentication } from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin } from '@/presentation/components'

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
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error: any) {
      setState({
        ...state,
        errorMessage: error.message,
        isLoading: false
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button disabled={(!!state.emailError || !!state.passwordError) || (!state.email || !state.password)} className={Styles.submit} data-testid="submit" type="submit">Entrar</button>
          <Link to="/singup" data-testid="singup" className={Styles.link}>criar Conta</Link>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
