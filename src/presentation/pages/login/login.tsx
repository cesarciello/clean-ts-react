import React from 'react'
import Styles from './login-styles.scss'
import { Footer, LoginHeader, Input, FormStatusLogin } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu emial" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span className={Styles.link}>criar Conta</span>
        <FormStatusLogin />
      </form>
      <Footer />
    </div>
  )
}

export default Login
