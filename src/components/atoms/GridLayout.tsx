import type {PropsWithChildren} from 'react'
import React from 'react'
import {Box, styled} from '@mui/material'

const GridContainer = styled(Box)(({theme}) => ({
  margin: 0,
  padding: 0,
  display: 'grid',
  gridAutoRows: '10px',
  justifyContent: 'center',
  border: '1px solid red',
  gridTemplateColumns: 'repeat(auto-fill, 100%)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, calc(50% - 42px))'
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(auto-fill, calc(33% - 42px))'
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(auto-fill, calc(25% - 46px))'
  }
}))

export const GridLayout: React.FC<PropsWithChildren> = ({children}) => {
  return <GridContainer>{children}</GridContainer>
}
