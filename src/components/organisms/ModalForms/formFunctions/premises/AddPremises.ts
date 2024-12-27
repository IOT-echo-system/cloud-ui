import {useEffect, useState} from 'react'
import {useForm, useToast} from '../../../../../hooks'
import {PremisesService} from '../../../../../services'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import type {Premises} from '../../../../../typing/premises'
import {MasterService} from '../../../../../services/masterService'
import type {ServerError} from '../../../../../typing/error'

type AddPremisesPropsType = {addPremises: (premises: Premises) => void}
export const AddPremises: GetFormPropsTypeFunction<AddPremisesPropsType> = (handleClose, {addPremises}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {onClear, values, handleSubmit, onChange} = useForm({
    name: '',
    address1: '',
    address2: '',
    district: '',
    state: '',
    pincode: 0
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
    PremisesService.createPremises({
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
        onClear()
        addPremises(newPremises)
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
    formTitle: 'Add premises',
    submitLabel: 'Add premises'
  }
}
