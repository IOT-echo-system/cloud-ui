import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from '../../hooks'
import mqtt from 'mqtt'
import {updateWidget} from '../../store/actions/boards'
import type {Widget} from '../../typing/widget/widget'

export const MqttSubscriber: React.FC<PropsWithChildren> = ({children}) => {
  const {user, project} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleMessage = (topic: string, payload: Buffer) => {
    const topicName = topic.slice(15)
    if (topicName === 'UPDATE_WIDGET') {
      const widget = JSON.parse(payload.toString()) as Widget
      dispatch(updateWidget(widget, widget.boardId))
    }
  }

  useEffect(() => {
    if (user.userId && project.projectId) {
      const client = mqtt.connect({
        protocol: 'ws',
        host: 'ws.robotutortech.com',
        port: 1885,
        clientId: `user_${user.userId}`,
        username: 'cloud-ui',
        password: 'Robotutor'
      })
      client.subscribe(`project/${project.projectId}/#`, () => {
        client.on('message', handleMessage)
      })
    }
  }, [user.userId, project.projectId])

  return <>{children}</>
}
