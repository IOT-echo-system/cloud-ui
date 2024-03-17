import React from 'react'
import {Button, CollapsibleAccordion, FormInput, Modal, TopCenteredContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {Add} from '@mui/icons-material'
import {useStart} from './useStart'
import theme from '../../../theme/light'
import {createProject} from './createProject'
import {useForm} from '../../../hooks'
import '../../../utils/extenstions'

export const Start: React.FC = () => {
  const {projects, handleSelect, addProject} = useStart()
  const {values, onChange, onClear, handleSubmit} = useForm({name: ''})
  const {modalOpen, handleOpen, handleClose, onSubmit, loading} = createProject(onClear, addProject)

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
            <Typography variant={'h4'}>Projects</Typography>
            <Button variant={'contained'} endIcon={<Add />} onClick={handleOpen}>
              Create
            </Button>
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
      <Modal open={modalOpen} handleClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant={'h5'}>Create Project</Typography>
            <FormInput
              value={values.name}
              onChange={event => {
                onChange('name', event.target.value)
              }}
              required
              label={'Project name'}
            />
            <Button type={'submit'} variant={'contained'} size={'large'} loading={loading}>
              Create
            </Button>
          </Stack>
        </form>
      </Modal>
    </TopCenteredContainer>
  )
}
