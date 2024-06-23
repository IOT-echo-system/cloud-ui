import type {PropsWithChildren} from 'react'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from '../../hooks'
import {updateWidget} from '../../store/actions/boards'
import type {Widget} from '../../typing/widget/widget'
import {getStorage, StorageKeys} from '../../utils/storage'

const retryCount = 3
const retryInterval = 3000

const url = typeof window !== 'undefined' ? `${window.location.href.replace('http', 'ws')}websockets` : ''
const {token} =
  typeof window !== 'undefined' ? getStorage<{token: string}>(StorageKeys.AUTH) ?? {token: 'token'} : {token: 'token'}

export const MqttSubscriber: React.FC<PropsWithChildren> = ({children}) => {
  const [retry, setRetry] = useState(retryCount)
  const [readyState, setReadyState] = useState(false)

  const {user, project} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleMessage = (data: string) => {
    const {event, payload} = JSON.parse(data)
    if (event === 'UPDATE_WIDGET') {
      const widget = payload as Widget
      dispatch(updateWidget(widget, widget.boardId))
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !readyState && user.userId && project.projectId) {
      const ws = new WebSocket(`${url}?client=web&token=${token}`)
      ws.onopen = () => {
        setReadyState(true)
        ws.onmessage = event => {
          handleMessage(event.data as string)
        }
        setRetry(retryCount)
      }

      ws.onclose = () => {
        setReadyState(false)
        if (retry > 0) {
          setTimeout(setRetry, retryInterval, retry - 1)
        } else {
          setTimeout(setRetry, retryInterval * 20, retryCount)
        }
      }
    }
  }, [user.userId, project.projectId, retry])

  return <>{children}</>
}
