import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Styles from './singup-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases/add-account'
import { SaveAccessToken } from '@/domain/usecases/save-acess-token'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SingUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
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
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const disabledButtonRule = (): boolean => ((!!state.emailError || !!state.passwordError || !!state.nameError || !!state.passwordConfirmationError) || (!state.email || !state.password || !state.name || !state.passwordConfirmation))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.nameError || state.passwordError || state.passwordConfirmationError) {
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
      await saveAccessToken.save(account.accessToken)
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
    <div className={Styles.singup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>SingUp</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button disabled={disabledButtonRule()} className={Styles.submit} data-testid="submit" type="submit">cadastrar</button>
          <Link to="/login" replace data-testid="login" className={Styles.link}>Voltar parar o Login</Link>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SingUp
