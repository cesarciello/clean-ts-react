import React from 'react'
import Spinner from '../spinner/spinner'
import Styles from './loading-styles.scss'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={Styles.loadingWrap}>
      <Spinner />
    </div>
  )
}

export default Loading
