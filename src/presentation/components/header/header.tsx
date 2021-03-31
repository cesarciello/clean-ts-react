import React, { memo } from 'react'
import Logo from '../logo/logo'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Cesar</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)