import React, { memo } from 'react'
import Styles from './login-header-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const LoginHeader: React.FC<Props> = (props: Props) => {
  return (
    <header className={Styles.header}>
      <h1>LOGIN</h1>
    </header>

  )
}

export default memo(LoginHeader)
