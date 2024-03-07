import React from 'react'
import {Button, CollapsibleAccordion, TopCenteredContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {Add} from '@mui/icons-material'
import {useStart} from './useStart'
import theme from '../../../theme/light'

export const Start: React.FC = () => {
  const {accounts, handleClick} = useStart()

  return (
    <TopCenteredContainer
      sx={{
        width: {sx: '100%', sm: '80%', md: '60%', lg: '40%'},
        border: '1px solid rgba(0, 0, 0, .125)',
        borderRadius: '4px'
      }}
    >
      <CollapsibleAccordion
        header={
          <Stack
            direction={'row'}
            p={2}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              background: 'white',
              boxShadow: theme.shadows[2],
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            }}
          >
            <Typography variant={'h4'}>Projects</Typography>
            <Button variant={'contained'} endIcon={<Add />}>
              Create
            </Button>
          </Stack>
        }
        accordions={accounts.map(account => ({
          accordionId: account.accountId,
          summary: account.name,
          details: (
            <Stack>
              <Typography variant={'body2'}>Project Id: {account.accountId}</Typography>
              <Stack direction={'row'} flexWrap={'wrap'} spacing={2} m={2}>
                {account.roles.map(role => (
                  <Button variant={'outlined'} key={role.roleId} onClick={handleClick(account.accountId, role.roleId)}>
                    {role.name}
                  </Button>
                ))}
              </Stack>
            </Stack>
          )
        }))}
      />
    </TopCenteredContainer>
  )
}
