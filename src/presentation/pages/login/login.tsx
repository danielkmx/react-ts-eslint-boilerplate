import React ,{ useState, useEffect, useContext } from 'react'
import Styles from './login-styles.scss'
import { Footer ,LoginHeader ,Input , FormStatus } from '@/presentation/components'
import { FormContext,ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link ,useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state,setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email',state.email),
      passwordError: validation.validate('password',state.password)

    })
  },[state.email,state.password])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({ email: state.email,password: state.password })
      setCurrentAccount(account)
      console.log(localStorage)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }
  return (
    <div className={Styles.login}>

      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" onSubmit={handleSubmit} className={Styles.form}>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" className={Styles.submit} disabled={!!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <Link to='signup' data-testid='signup' className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
