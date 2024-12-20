export interface User {
  userId: string
  name: string
  email: string
  registeredAt: Date
  roleId: string
  policies: Array<{policyId: string; name: string}>
}
