import {useEffect, useState} from 'react'
import {InvoiceService} from '../../../../../services/widgets/invoiceService'
import {useToast} from '../../../../../hooks'
import type {InvoiceSeed} from '../../../../../services/widgets/typing/invoice'
import type {InvoiceWidget} from '../../../../../typing/widget/widget'

type UseInvoiceSeed = (widget: InvoiceWidget) => {
  open: boolean
  handleToggle: () => void
  loadingSeed: boolean
  seed: InvoiceSeed[]
  addSeed: (invoiceSeed: InvoiceSeed) => void
  updateSeed: (seedCode: string, updatedInvoiceSeed: InvoiceSeed) => void
}

export const useInvoiceSeed: UseInvoiceSeed = widget => {
  const [open, setOpen] = useState(false)
  const [loadingSeed, setLoadingSeed] = useState(false)
  const [seed, setSeed] = useState<InvoiceSeed[]>([])
  const toast = useToast()
  const handleToggle = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setLoadingSeed(true)
    InvoiceService.getSeedData(widget)
      .then(seedData => {
        setSeed(seedData)
      })
      .catch(toast.error)
      .finally(() => {
        setLoadingSeed(false)
      })
  }, [])

  const addSeed = (seedItem: InvoiceSeed) => {
    setSeed(seed.concat(seedItem))
  }

  const updateSeed = (seedCode: string, updatedSeedItem: InvoiceSeed) => {
    setSeed(seed.map(seedItem => (seedItem.code === seedCode ? updatedSeedItem : seedItem)))
  }

  return {open, handleToggle, loadingSeed, seed, addSeed, updateSeed}
}
