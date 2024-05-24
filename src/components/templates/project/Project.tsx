import React from 'react'
import {useSelector} from '../../../hooks'
import {Breadcrumbs, Button, CollapsibleAccordion, EditableTitleWithId, PageContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {ModalForms} from '../../organisms'
import {Add} from '@mui/icons-material'
import {AddProject, EditProjectName} from '../../organisms/ModalForms/formFunctions'
import {useStart} from '../start/useStart'
import {PolicyUtils} from '../../../utils/policyUtils'

export const Project: React.FC = () => {
  const {project} = useSelector(state => state)
  const {projects, handleSelect, addProject} = useStart()
  const otherProjects = projects.filter(account => account.projectId !== project.projectId)

  return (
    <PageContainer pt={2} spacing={4}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[]} text={'Project'} />
        <ModalForms getFormDetails={AddProject} handleAdd={addProject}>
          <Button variant={'contained'} startIcon={<Add />}>
            Create new project
          </Button>
        </ModalForms>
      </Stack>

      <Stack spacing={2}>
        <EditableTitleWithId
          policyId={PolicyUtils.PROJECT_UPDATE}
          getFormDetails={EditProjectName}
          project={project}
          title={project.name}
          id={project.projectId}
          idLabel={'Project Id'}
        />
        {/*<Users/>*/}
      </Stack>

      {otherProjects.isNotEmpty() && (
        <CollapsibleAccordion
          header={
            <Typography variant={'h5'} component={'div'}>
              Other Projects
            </Typography>
          }
          accordions={projects.map(account => ({
            accordionId: account.projectId,
            summary: account.name,
            details: (
              <Stack>
                <Typography variant={'body2'}>Project Id: {account.projectId}</Typography>
                <Stack direction={'row'} flexWrap={'wrap'} spacing={2} m={2}>
                  {account.roles.map(role => (
                    <Button
                      variant={'outlined'}
                      key={role.roleId}
                      onClick={handleSelect(account.projectId, role.roleId)}
                    >
                      {role.name}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            )
          }))}
        />
      )}
    </PageContainer>
  )
}
