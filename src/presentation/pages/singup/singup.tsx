import { Link } from 'react-router-dom'
import React from 'react'

import Styles from './singup-styles.scss'
import Context from '@/presentation/context/form-login/form-login-context'
import { Footer, LoginHeader, Input, FormStatusLogin } from '@/presentation/components'

const SingUp: React.FC = () => {
  return (
    <div className={Styles.singup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={Styles.form}>
          <h2>SingUp</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmarion" placeholder="Confirme sua senha" />
          <button disabled className={Styles.submit} data-testid="submit" type="submit">cadastrar</button>
          <Link to="/login" data-testid="singup" className={Styles.link}>Voltar parar o Login</Link>
          <FormStatusLogin />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SingUp
