import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import type {Zone} from '../../../../../typing/zones'
import {ZoneService} from '../../../../../services/zoneService'
import {updateZone} from '../../../../../store/actions/zones'

export const UpdateZoneName: GetFormPropsTypeFunction<{zone: Zone}> = (handleClose, {zone}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: zone.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Zone name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    ZoneService.updateName(zone.premisesId, zone.zoneId, values)
      .then(zone => {
        handleClose()
        dispatch(updateZone(zone))
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    formInputs,
    formTitle: 'Update zone name',
    submitLabel: 'Update name'
  }
}
