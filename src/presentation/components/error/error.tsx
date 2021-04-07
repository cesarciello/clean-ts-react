import React from 'react'

import Styles from './error-styles.scss'

type Props = {
  error: string
  onReload: () => void
}

const Error: React.FC<Props> = ({ error, onReload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {error}
      </span>
      <button data-testid="reload" onClick={onReload}>try again</button>
    </div>)
}

export default Error
