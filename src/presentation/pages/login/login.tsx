import React ,{ useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer ,LoginHeader ,Input , FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state,setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    erroMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })
  useEffect(() => {
    validation.validate({ email: state.email })
  },[state.email])
  useEffect(() => {
    validation.validate({ password: state.password })
  },[state.password])
  return (
    <div className={Styles.login}>

      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
