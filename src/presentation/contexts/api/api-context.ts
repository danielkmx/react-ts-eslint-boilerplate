import { createContext } from 'react'
import { AccountDto } from '@/domain/models/account-dto'

type Props = {
  setCurrentAccount: (account: AccountDto) => void
  getCurrentAccount: () => AccountDto
}

export default createContext<Props>(null)
