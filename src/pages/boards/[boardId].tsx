import type {NextPage} from 'next'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {BoardTemplate} from '../../components/templates/boards/BoardTemplate'
import {useRouter} from 'next/router'
import {useSelector} from '../../hooks'
import {Loader} from '../../components/atoms'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const {boards} = useSelector(state => state)
  const board = boards.find(board => board.boardId === (router.query.boardId as string))

  if (!board) {
    return <Loader loadingText={'Loading...'} />
  }

  return <PageAllowed Component={BoardTemplate} policyId={PolicyUtils.BOARD_GET} board={board} />
}

export default BoardPage
