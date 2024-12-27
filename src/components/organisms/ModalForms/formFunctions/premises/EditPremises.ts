import {useEffect, useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import {PremisesService} from '../../../../../services'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import type {Premises} from '../../../../../typing/premises'
import {updatePremises} from '../../../../../store/actions/premises'
import {MasterService} from '../../../../../services/masterService'
import type {ServerError} from '../../../../../typing/error'

export const EditPremises: GetFormPropsTypeFunction<{premises: Premises}> = (handleClose, {premises}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({
    name: premises.name,
    address1: premises.address.address1,
    address2: premises.address.address2,
    district: premises.address.district,
    state: premises.address.state,
    pincode: premises.address.pincode
  })

  useEffect(() => {
    if (values.pincode.toString().length === 6) {
      MasterService.getLocation(values.pincode)
        .then(location => {
          onChange('state', location.state)
          onChange('district', location.district)
        })
        .catch((error: ServerError) => {
          onChange('state', '')
          onChange('district', '')
          toast.error(error)
        })
    }
  }, [values.pincode])

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Premises name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Address 1 ',
      value: values.address1,
      required: true,
      onChange: event => {
        onChange('address1', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Address 2',
      value: values.address2,
      onChange: event => {
        onChange('address2', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Pincode',
      type: 'number',
      value: values.pincode === 0 ? '' : values.pincode,
      required: true,
      onChange: event => {
        onChange('pincode', +event.target.value)
      },
      error: values.pincode !== 0 && !(100000 <= values.pincode && values.pincode <= 999999),
      get helperText() {
        return this.error ? 'Zip code should be 6 digits long' : ''
      }
    },
    {
      disabled: true,
      inputType: 'textField',
      label: 'District',
      value: values.district,
      required: true
    },
    {
      disabled: true,
      inputType: 'textField',
      label: 'State',
      value: values.state,
      required: true
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    PremisesService.updatePremises(premises.premisesId, {
      name: values.name,
      address: {
        address1: values.address1,
        address2: values.address2,
        district: values.district,
        state: values.state,
        pincode: values.pincode
      }
    })
      .then(newPremises => {
        dispatch(updatePremises(newPremises))
        handleClose()
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
    formTitle: 'Update premises',
    submitLabel: 'Update premises'
  }
}
