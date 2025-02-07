import {useForm, useSelector} from '../../../../../../hooks'
import type {FormInputType, FormSelectOption} from '../../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../../model'
import {getList} from '../../../../../../utils/utils'
import type {Feed} from '../../../../../../typing/feed'
import type {WidgetTypes} from './widgets'
import {widgetTypes} from './widgets'
import type {FormStepProps} from './AddWidget'

export type WidgetDetailsType = {name: string; type: WidgetTypes; feedId: string}
export const AddWidgetDetails: GetFormPropsTypeFunction<FormStepProps> = (_handleClose, props) => {
  const {nextStep, onSubmit} = props

  const premises = useSelector(state => state.premises!)
  const {feeds} = useSelector(state => state)

  const feedList = getList<Feed>(feeds, premises.premisesId)
  const feedIds: FormSelectOption[] = feedList.map(feed => {
    return {label: `${feed.name} (${feed.feedId})`, value: feed.feedId} as FormSelectOption
  })
  const widgets: FormSelectOption[] = widgetTypes.map(type => ({label: type, value: type}))

  const initialValues: WidgetDetailsType = {name: '', type: 'TOGGLE', feedId: ''}
  const {values, handleSubmit, onChange, onClear} = useForm(initialValues)

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Widget name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      label: 'Feed',
      options: feedIds,
      value: values.feedId,
      required: true,
      handleChange: value => {
        onChange('feedId', value as string)
      }
    },
    {
      inputType: 'selectField',
      label: 'Widget type',
      options: widgets,
      value: values.type,
      required: true,
      handleChange: value => {
        onChange('type', value as WidgetTypes)
      }
    }
  ]

  const onFormSubmit = () => {
    onSubmit(values)
    nextStep()
    onClear()
  }

  return {
    handleSubmit: handleSubmit(onFormSubmit),
    formInputs,
    formTitle: 'Add widget',
    submitLabel: 'Next'
  }
}
