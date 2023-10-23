import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import type {SiteStateType} from '@/store/reducers/site'
import {updateSite} from '@/store/actions/site'
import {useDispatch} from '@/hooks'

const SiteWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const site: SiteStateType = {title: 'Cloud'}
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateSite(site))
  }, [])

  return <>{children}</>
}

export default SiteWrapper
