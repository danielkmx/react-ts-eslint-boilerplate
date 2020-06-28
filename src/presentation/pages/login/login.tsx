import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Footer from '@/presentation/components/footer/footer'
import LoginHeader from '@/presentation/components/login-header/login.header'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span>Preenchimento obrigatório</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span>Preenchimento obrigatório</span>
        </div>
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
