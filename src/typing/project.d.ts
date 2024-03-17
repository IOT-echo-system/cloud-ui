export type Policy = {name: string; policyId: string}
export type Role = {roleId: string; name: string}

export interface Project {
  projectId: string
  name: string
  roles: Role[]
  policies: Policy[]
}
