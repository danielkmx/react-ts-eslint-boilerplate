import React ,{ useState } from 'react'
import Styles from './login-styles.scss'
import { Footer ,LoginHeader ,Input , FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    erroMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })
  return (
    <div className={Styles.login}>

      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" className={Styles.submit} disabled type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
