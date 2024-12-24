import {useState} from 'react'
import {useForm, useToast} from '../../../../../hooks'
import {PremisesService} from '../../../../../services'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import type {Premises} from '../../../../../typing/premises'

type AddPremisesPropsType = {addPremises: (premises: Premises) => void}
export const AddPremises: GetFormPropsTypeFunction<AddPremisesPropsType> = (handleClose, {addPremises}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {onClear, values, handleSubmit, onChange} = useForm({
    name: '',
    address1: '',
    address2: '',
    city: '',
    district: '',
    state: '',
    zipCode: 0
  })

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
      label: 'City',
      value: values.city,
      required: true,
      onChange: event => {
        onChange('city', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'District',
      value: values.district,
      required: true,
      onChange: event => {
        onChange('district', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'State',
      value: values.state,
      required: true,
      onChange: event => {
        onChange('state', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Zip code',
      type: 'number',
      value: values.zipCode === 0 ? '' : values.zipCode,
      required: true,
      onChange: event => {
        onChange('zipCode', +event.target.value)
      },
      error: values.zipCode !== 0 && !(100000 <= values.zipCode && values.zipCode <= 999999),
      get helperText() {
        return this.error ? 'Zip code should be 6 digits long' : ''
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    PremisesService.createPremises({
      name: values.name,
      address: {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        district: values.district,
        state: values.state,
        zipCode: values.zipCode
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
