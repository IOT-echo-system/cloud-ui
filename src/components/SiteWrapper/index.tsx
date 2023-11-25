import type {PropsWithChildren} from 'react'
import React from 'react'

const SiteWrapper: React.FC<PropsWithChildren> = ({children}) => {
  // const site: SiteStateType = {title: 'Cloud'}
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(updateSite(site))
  // }, [])

  return <>{children}</>
}

export default SiteWrapper
