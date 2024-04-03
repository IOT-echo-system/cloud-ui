import {useEffect, useState} from 'react'
import {useToast} from '../../../hooks'
import {BoardService} from '../../../services/boardService'

export type UseBoardSecretKey = (boardId: string) => {
  loading: boolean
  secretKey: string
  updateSecretKey: () => void
  copyToClipboard: () => void
  copied: boolean
}

export const useBoardSecretKey: UseBoardSecretKey = boardId => {
  const [secretKey, setSecretKey] = useState('secret')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (copied) {
      setTimeout(setCopied, 3000, false)
    }
  }, [copied])

  useEffect(() => {
    setLoading(true)
    BoardService.getSecretKey(boardId)
      .then(response => {
        setSecretKey(response.secretKey)
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const updateSecretKey = () => {
    setLoading(true)
    BoardService.updateSecretKey(boardId)
      .then(response => {
        setSecretKey(response.secretKey)
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretKey).then(() => {
      setCopied(true)
    })
  }

  return {secretKey, loading, updateSecretKey, copyToClipboard, copied}
}
