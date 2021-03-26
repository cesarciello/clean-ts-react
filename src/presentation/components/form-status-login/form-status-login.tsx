import React from 'react'
import Spinner from '../spinner/spinner'
import Styles from './form-status-login.scss'

const FormStatusLogin: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default FormStatusLogin
