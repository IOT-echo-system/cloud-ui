import {initWebClient} from './webClient'
import {apiConfig} from '../config/apiConfig'
import {useToast} from '../hooks'
import type {AccountsWithRoleResponse} from './typing/account'

const accountConfig = apiConfig.account

export const AccountService = () => {
  const toast = useToast()
  const WebClient = initWebClient(toast)
  return {
    getAccountsWithRoles(): Promise<AccountsWithRoleResponse> {
      return WebClient.get<AccountsWithRoleResponse>({
        baseUrl: accountConfig.baseUrl,
        path: accountConfig.accounts
      })
    },
    getAccount(accountId: string, roleId: string) {
      return WebClient.get<AccountsWithRoleResponse>({
        baseUrl: accountConfig.baseUrl,
        path: accountConfig.accounts,
        uriVariables: {accountId, roleId}
      })
    }
  }
}
