import type {MouseEventHandler} from 'react'
import {useEffect, useState} from 'react'
import {AccountService} from '../../../services/accountService'
import type {AccountWithRoles} from '../../../services/typing/account'
import {useToast} from '../../../hooks'
import {AuthService} from '../../../services'
import {useRouter} from 'next/router'
import {Config} from '../../../config'

type UseStartType = {
  accounts: AccountWithRoles[]
  handleSelect: (accountId: string, roleId: string) => MouseEventHandler<HTMLButtonElement>
  addAccount: (account: AccountWithRoles) => void
}

export const useStart = (): UseStartType => {
  const [accounts, setAccounts] = useState<AccountWithRoles[]>([])
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    AccountService.getAccountsWithRoles().then(setAccounts).catch(toast.error)
  }, [])

  const handleSelect = (accountId: string, roleId: string): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      AuthService.updateToken(accountId, roleId)
        .then(() => router.push(Config.HOME_PAGE_PATH))
        .catch(toast.error)
    }
  }

  const addAccount = (account: AccountWithRoles) => {
    setAccounts([account, ...accounts])
  }

  useEffect(() => {
    AccountService.getAccountsWithRoles().then(res => {
      setAccounts(res)
    })
  }, [])

  return {accounts, handleSelect, addAccount}
}
