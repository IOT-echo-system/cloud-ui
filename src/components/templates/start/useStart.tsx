import type {MouseEventHandler} from 'react'
import {useEffect, useState} from 'react'
import {AccountService} from '../../../services/accountService'
import type {AccountWithRoles} from '../../../services/typing/account'

type UseStartType = {
  accounts: AccountWithRoles[]
  handleClick: (accountId: string, roleId: string) => MouseEventHandler<HTMLButtonElement>
}

export const useStart = (): UseStartType => {
  const accountService = AccountService()
  const [accounts, setAccounts] = useState<AccountWithRoles[]>([])

  const handleClick = (accountId: string, roleId: string): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      accountService.getAccount(accountId, roleId)
    }
  }

  useEffect(() => {
    accountService.getAccountsWithRoles().then(res => {
      setAccounts(res)
    })
  }, [])

  return {accounts, handleClick}
}
