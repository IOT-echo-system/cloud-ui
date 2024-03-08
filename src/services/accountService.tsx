import {apiConfig} from '../config/apiConfig'
import type {AccountsWithRoleResponse, AccountWithRoles} from './typing/account'
import WebClient from './webClient'

const accountConfig = apiConfig.account

export const AccountService = {
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
  },

  createProject(values: {name: string}): Promise<AccountWithRoles> {
    return WebClient.post<AccountWithRoles>({
      baseUrl: accountConfig.baseUrl,
      path: accountConfig.accounts,
      body: values
    })
  }
}
