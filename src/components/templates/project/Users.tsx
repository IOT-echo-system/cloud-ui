import React, {useState} from 'react'
import {Stack, Typography} from '@mui/material'
import {Button} from '../../atoms'

export const Users: React.FC = () => {
  const [showUsers, setShowUsers] = useState(false)
  const toggleView = () => {
    setShowUsers(!showUsers)
  }

  return (
    <Stack pt={2} spacing={2}>
      <Stack direction={'row'} spacing={4}>
        <Button onClick={toggleView} variant={'contained'}>
          {showUsers ? 'Hide users' : 'Show users'}
        </Button>
        {showUsers && <Button variant={'contained'}>Add user</Button>}
      </Stack>
      {showUsers && (
        <Stack>
          <Stack>
            <Typography variant={'body1'}>Shivam Rajput</Typography>
            <Typography variant={'body2'}>User Id: 00000001</Typography>
            <Stack direction={'row'} flexWrap={'wrap'} spacing={2} m={2}>
              {/*{[].map(role => (*/}
              {/*  <Button variant={'outlined'} key={role.roleId}*/}
              {/*          onClick={handleSelect(account.projectId, role.roleId)}>*/}
              {/*    {role.name}*/}
              {/*  </Button>*/}
              {/*))}*/}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
