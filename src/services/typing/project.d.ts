export type Roles = {roleId: string; name: string}
export type ProjectWithRoles = {name: string; projectId: string; roles: Roles[]}
export type ProjectsWithRoleResponse = ProjectWithRoles[]
