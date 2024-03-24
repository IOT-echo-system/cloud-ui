import type {NextPage} from 'next'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {Boards} from '../../components/templates/boards/Boards'

const BoardsPage: NextPage = () => {
  return <PageAllowed policyId={PolicyUtils.BOARD_GET} Component={Boards} />
}

export default BoardsPage
