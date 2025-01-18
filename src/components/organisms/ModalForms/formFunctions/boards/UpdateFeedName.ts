import {useState} from 'react'
import {useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {FeedService} from '../../../../../services'
import type {Feed} from '../../../../../typing/feed'

type UpdateFeedNamePropsType = {feed: Feed; updateFeed: (feed: Feed) => void}
export const UpdateFeedName: GetFormPropsTypeFunction<UpdateFeedNamePropsType> = (handleClose, {feed, updateFeed}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
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
        updateFeed(feed)
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
