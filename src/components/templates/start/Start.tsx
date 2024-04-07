import React from 'react'
import {Button, CollapsibleAccordion, TopCenteredContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {Add} from '@mui/icons-material'
import {useStart} from './useStart'
import theme from '../../../theme/light'
import '../../../utils/extenstions'
import {ModalForms} from '../../organisms'
import {AddProject} from '../../organisms/ModalForms/formFunctions/AddProject'

export const Start: React.FC = () => {
  const {projects, handleSelect, addProject, userId} = useStart()

  return (
    <TopCenteredContainer
      sx={{
        width: {xs: '90%', sm: '80%', md: '600px'},
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
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: projects.isEmpty() ? '4px' : '0',
              borderBottomRightRadius: projects.isEmpty() ? '4px' : '0'
            }}
          >
            <Stack direction={{sm: 'row'}} spacing={{sm: 2}} alignItems={{sm: 'center'}}>
              <Typography variant={'h4'} component={'div'}>
                Projects
              </Typography>
              <Typography variant={'subtitle1'} component={'div'}>
                User Id: {userId}
              </Typography>
            </Stack>
            <ModalForms getFormDetails={AddProject} handleAdd={addProject}>
              <Button variant={'contained'} endIcon={<Add />}>
                Create
              </Button>
            </ModalForms>
          </Stack>
        }
        accordions={projects.map(account => ({
          accordionId: account.projectId,
          summary: account.name,
          details: (
            <Stack>
              <Typography variant={'body2'}>Project Id: {account.projectId}</Typography>
              <Stack direction={'row'} flexWrap={'wrap'} spacing={2} m={2}>
                {account.roles.map(role => (
                  <Button variant={'outlined'} key={role.roleId} onClick={handleSelect(account.projectId, role.roleId)}>
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
