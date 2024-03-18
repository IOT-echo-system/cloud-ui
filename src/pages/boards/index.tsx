import type {NextPage} from 'next'
import {Boards} from '../../components/templates/boards/Boards'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'

const BoardsPage: NextPage = () => {
  return <PageAllowed policyId={PolicyUtils.BOARD_GET} Component={Boards} />
}

export default BoardsPage
