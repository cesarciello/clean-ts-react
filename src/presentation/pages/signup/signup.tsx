import { Link, useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

import Styles from './signup-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases/add-account'
import ApiContext from '@/presentation/context/api/api-context'

type StateProps = {
  name: string
  email: string
  password: string
  nameError: string
  isLoading: boolean
  emailError: string
  errorMessage: string
  passwordError: string
  isFormInvalid: boolean
  passwordConfirmation: string
  passwordConfirmationError: string
}

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    isFormInvalid: true,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    const nameError = validation.validate('name', { name: state.name })
    const emailError = validation.validate('email', { email: state.email })
    const passwordError = validation.validate('password', { password: state.password })
    const passwordConfirmationError = validation.validate('passwordConfirmation', { password: state.password, passwordConfirmation: state.passwordConfirmation })
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!emailError || !!passwordError || !!nameError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

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
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: error.message
      })
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>SignUp</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitButton text="cadastrar" />
          <Link to="/login" replace data-testid="login" className={Styles.link}>Voltar parar o Login</Link>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
