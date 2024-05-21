import React from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import {IconButton, Slider, Stack, Switch, Typography} from '@mui/material'
import {PolicyUtils} from '../../../../../utils/policyUtils'
import {Button, PolicyAllowed} from '../../../../atoms'
import {ModalForms} from '../../../ModalForms/ModalForms'
import {Delete, Edit} from '@mui/icons-material'
import {EditSwitchButton} from './EditSwitchButton'
import {ConfirmationModals} from '../../../../molecules'
import {DeleteSwitchButton} from './DeleteSwitchButton'
import {useSwitchButtons} from './useSwitchButtons'

type SwitchButtonsPropsType = {widget: CollectionOfButtonsWidget}

export const SwitchButtons: React.FC<SwitchButtonsPropsType> = ({widget}) => {
  const {editMode, toggleEditMode, handleChange} = useSwitchButtons(widget)

  if (widget.buttons.isEmpty()) {
    return <Typography color={'error'}>You haven't configured any button!!</Typography>
  }

  return (
    <Stack spacing={1}>
      <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE}>
        <Stack direction={'row'}>
          <Button variant={'contained'} onClick={toggleEditMode}>
            {editMode ? 'Disable' : 'Enable'} edit mode
          </Button>
        </Stack>
      </PolicyAllowed>
      {widget.buttons.map(button => {
        return (
          <Stack key={button.buttonId} direction={'row'} justifyContent={'space-between'}>
            <Stack
              direction={button.type === 'DIGITAL' ? 'row' : 'column'}
              justifyContent={button.type === 'DIGITAL' ? 'space-between' : 'center'}
              alignItems={button.type === 'DIGITAL' ? 'center' : 'start'}
              width={'100%'}
            >
              <Stack>
                <Typography>
                  {button.name} {button.type === 'ANALOG' ? `[${button.value}${button.symbol}]` : ''}
                </Typography>
                {editMode && <Typography variant={'body2'}>ButtonId: {button.buttonId}</Typography>}
              </Stack>
              {button.type === 'DIGITAL' ? (
                <Switch
                  disabled={button.mode === 'INPUT'}
                  defaultChecked={button.value === 1}
                  onChange={handleChange<'boolean'>(button)}
                />
              ) : (
                <Stack spacing={2} direction="row" sx={{width: '100%'}} alignItems="center" justifyContent={'center'}>
                  <Typography>
                    {button.min}
                    {button.symbol}
                  </Typography>
                  <Slider
                    disabled={button.mode === 'INPUT'}
                    min={button.min}
                    max={button.max}
                    defaultValue={button.value}
                    onChange={handleChange<'number'>(button)}
                    valueLabelDisplay="auto"
                  />
                  <Typography>
                    {button.max}
                    {button.symbol}
                  </Typography>
                </Stack>
              )}
            </Stack>
            {editMode && (
              <Stack direction={'row'}>
                <ModalForms getFormDetails={EditSwitchButton} widget={widget} button={button}>
                  <IconButton color={'primary'} title={'Edit'}>
                    <Edit />
                  </IconButton>
                </ModalForms>
                <ConfirmationModals getConfirmationModalDetails={DeleteSwitchButton} widget={widget} button={button}>
                  <IconButton color={'error'} title={'Delete'}>
                    <Delete />
                  </IconButton>
                </ConfirmationModals>
              </Stack>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
