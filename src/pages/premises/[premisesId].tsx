import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useSelector} from '../../hooks'
import {Loader} from '../../components/atoms'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const allPremises = useSelector(state => state.premises)
  const premises = allPremises.find(prem => prem.premisesId === (router.query.premisesId as string))

  if (!premises) {
    return <Loader loadingText={'Loading...'} />
  }
  return <>Premises: {router.query.premisesId}</>
  // return <PageAllowed Component={Board} policy={PolicyUtils.PREMISES_READ} board={premises} />
}

export default BoardPage
