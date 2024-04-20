import React from 'react'
import {useInvoiceSeed} from './useInvoiceSeed'
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import {Button} from '../../../../atoms'
import {ModalForms} from '../../../ModalForms/ModalForms'
import {Add, Delete, Edit} from '@mui/icons-material'
import {AddInvoiceSeedItem} from './AddInvoiceSeedItem'
import {EditInvoiceSeedItem} from './EditInvoiceSeedItem'
import type {InvoiceWidget} from '../../../../../typing/widget/widget'

type InvoiceSeedPropsType = {widget: InvoiceWidget}
export const InvoiceSeed: React.FC<InvoiceSeedPropsType> = ({widget}) => {
  const {open, handleToggle, seed, addSeed, updateSeed} = useInvoiceSeed(widget)

  return (
    <Stack alignItems={'start'} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
        <Button onClick={handleToggle} variant={'contained'}>
          {open ? 'Hide' : 'Show'} seed data
        </Button>
        {open && (
          <ModalForms getFormDetails={AddInvoiceSeedItem} widget={widget} addSeed={addSeed}>
            <Button endIcon={<Add />} variant={'contained'}>
              Add Seed
            </Button>
          </ModalForms>
        )}
      </Stack>
      {open && (
        <>
          {seed.isEmpty() ? (
            <Typography color={'error'}>You haven't configured any seed data!!!</Typography>
          ) : (
            <TableContainer component={Paper} sx={{border: '1px solid #aaa'}}>
              <Table aria-label="invoice seed">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Item name</TableCell>
                    <TableCell>Item code</TableCell>
                    <TableCell align="right">Price/unit</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seed.map((seedItem, index) => (
                    <TableRow key={seedItem.code} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{seedItem.name}</TableCell>
                      <TableCell>{seedItem.code}</TableCell>
                      <TableCell align="right">{seedItem.pricePerUnit}</TableCell>
                      <TableCell align={'center'}>
                        <Stack direction={'row'} justifyContent={'center'}>
                          <ModalForms
                            getFormDetails={EditInvoiceSeedItem}
                            updateSeed={updateSeed}
                            widget={widget}
                            seedItem={seedItem}
                          >
                            <IconButton title={'Edit'} color={'primary'}>
                              <Edit />
                            </IconButton>
                          </ModalForms>
                          <IconButton title={'Delete'} color={'error'}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Stack>
  )
}
