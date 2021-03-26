import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import Styles from './form-status-login.scss'
import Context from '@/presentation/context/form-login/form-login-context'

const FormStatusLogin: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} />}
      { errorMessage && <span data-testid="errorMessage" className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatusLogin
