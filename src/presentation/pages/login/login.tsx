import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Footer from '@/presentation/components/footer/footer'
import HeaderLogin from '@/presentation/components/login-header/login-header'
import Input from '@/presentation/components/input/input'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu emial" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span className={Styles.link}>criar Conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
