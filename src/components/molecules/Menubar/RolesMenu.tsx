import React, {useState} from 'react'
import {Button} from '../../atoms'
import {Menu, MenuItem} from '@mui/material'
import {useSelector, useToast} from '../../../hooks'
import '../../../utils/extenstions'
import {AuthService} from '../../../services'
import {router} from 'next/client'
import {useRouter} from 'next/router'

export const RolesMenu = () => {
  const {user, project} = useSelector(state => state)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const toast = useToast()
  const router = useRouter()
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (roleId: string) => () => {
    AuthService.updateToken(project.projectId, roleId).then(router.reload).catch(toast.error)
  }

  const roles = project.roles.filter(role => role.roleId !== user.roleId)

  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
      >
        {project.roles.find(role => role.roleId === user.roleId)!.name}
      </Button>
      {roles.isNotEmpty() && (
        <Menu open={open} onClose={handleClose} id={'basic-menu'} anchorEl={anchorEl}>
          {roles.map(({name, roleId}) => {
            return (
              <MenuItem onClick={handleClick(roleId)} key={roleId}>
                {name}
              </MenuItem>
            )
          })}
        </Menu>
      )}
    </div>
  )
}
