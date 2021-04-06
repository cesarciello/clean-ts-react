import { useHistory } from 'react-router'
import React, { memo, useContext } from 'react'

import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'
import ApiContext from '@/presentation/context/api/api-context'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)
  const logoutEvent = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logoutEvent}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
