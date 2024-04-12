import type {Widget} from '../../../../../typing/widget'
import React from 'react'
import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import {useMedia} from '../../../../../hooks'

type InvoiceCartPropsType = {widget: Widget}

export const InvoiceCart: React.FC<InvoiceCartPropsType> = ({widget}) => {
  const media = useMedia()

  if (widget.cart.isEmpty()) {
    return (
      <Typography color={'error'} textAlign={'center'} p={2}>
        You haven't added any item in cart!!!
      </Typography>
    )
  }

  return (
    <Stack mt={1} mb={1}>
      <TableContainer component={Paper} sx={{border: '1px solid #aaa'}}>
        <Table aria-label="invoice seed">
          <TableHead>
            <TableRow>
              {media.md && <TableCell>S.No.</TableCell>}
              <TableCell>Item name</TableCell>
              {media.md && <TableCell>Item code</TableCell>}
              <TableCell align="right">Price/unit</TableCell>
              <TableCell align="right">units</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {widget.cart.map((cartItem, index) => (
              <TableRow key={cartItem.code} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {media.md && <TableCell>{index + 1}</TableCell>}
                <TableCell>{cartItem.name}</TableCell>
                {media.md && <TableCell>{cartItem.code}</TableCell>}
                <TableCell align="right">{cartItem.pricePerUnit}</TableCell>
                <TableCell align="right">{cartItem.unit}</TableCell>
                <TableCell align="right">{cartItem.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={media.md ? 3 : 1}></TableCell>
              <TableCell align={'right'}>
                <strong>Total</strong>
              </TableCell>
              <TableCell align={'right'}>
                <strong>{widget.totalItems}</strong>
              </TableCell>
              <TableCell align={'right'}>
                <strong>{widget.totalPrice}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
