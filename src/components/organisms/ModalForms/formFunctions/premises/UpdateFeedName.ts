import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {FeedService} from '../../../../../services'
import type {Feed} from '../../../../../typing/feed'
import {updateFeed} from '../../../../../store/actions/feeds'

type UpdateFeedNamePropsType = {feed: Feed}
export const UpdateFeedName: GetFormPropsTypeFunction<UpdateFeedNamePropsType> = (handleClose, {feed}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: feed.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Feed name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    FeedService.updateName(feed.feedId, values)
      .then(feed => {
        handleClose()
        dispatch(updateFeed(feed))
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
    formTitle: 'Update feed name',
    submitLabel: 'Update name'
  }
}
