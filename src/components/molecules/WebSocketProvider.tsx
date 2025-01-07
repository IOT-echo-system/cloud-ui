import type {PropsWithChildren} from 'react'
import React, {useEffect, useState} from 'react'
import {useSelector} from '../../hooks'
import {getStorage, StorageKeys} from '../../utils/storage'

const retryCount = 3
const retryInterval = 3000

const url = typeof window !== 'undefined' ? `${window.location.origin.replace('http', 'ws')}/websockets` : ''
const {token} =
  typeof window !== 'undefined' ? getStorage<{token: string}>(StorageKeys.AUTH) ?? {token: 'token'} : {token: 'token'}

export const WebSocketProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [retry, setRetry] = useState(retryCount)
  const [readyState, setReadyState] = useState(false)

  const {user} = useSelector(state => state)

  const handleMessage = (content: string) => {
    JSON.parse(content)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !readyState && user.userId) {
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
  }, [user.userId, retry])

  return <>{children}</>
}
