import React, { memo } from 'react'
import Logo from '../logo/logo'
import Styles from './login-header-styles.scss'

const HeaderLogin: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Devs - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(HeaderLogin)
