import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Styles from './login-styles.scss'
import { Authentication } from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin, SubmitButton } from '@/presentation/components'
import { SaveAccessToken } from '@/domain/usecases/save-acess-token'

type StateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  password: string
  emailError: string
  passwordError: string
  isFormInvalid: boolean
}

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    isFormInvalid: true,
    emailError: '',
    passwordError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const validEmail = validation.validate('email', { email: state.email })
    const validPassword = validation.validate('password', { password: state.password })
    setState({
      ...state,
      emailError: validEmail,
      passwordError: validPassword,
      isFormInvalid: !!validEmail || !!validPassword
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
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
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
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
          {/* <button disabled={(state.isInvalidForm) || (!state.email || !state.password)} className={Styles.submit} data-testid="submit" type="submit">Entrar</button> */}
          <SubmitButton text="entrar" />
          <Link to="/signup" data-testid="signup" className={Styles.link}>criar Conta</Link>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
