import type {NextPage} from 'next'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {useRouter} from 'next/router'
import {useSelector} from '../../hooks'
import {Loader} from '../../components/atoms'
import {Routine} from '../../components/templates/routines/Routine'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const {routines} = useSelector(state => state)
  const routine = routines.find(routine => routine.routineId === (router.query.routineId as string))

  if (!routine) {
    return <Loader loadingText={'Loading...'} />
  }

  return <PageAllowed Component={Routine} policyId={PolicyUtils.ROUTINE_GET} routine={routine} />
}

export default BoardPage
