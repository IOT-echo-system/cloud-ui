import React from 'react'
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import {ExpandMore} from '@mui/icons-material'
import {styled} from '@mui/material/styles'

const Accordion = styled(MuiAccordion)(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: 0,
  borderRight: 0,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    background: theme.palette.grey[50]
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  background: theme.palette.grey[50]
}))

export type AccordionType = {
  details: React.JSX.Element
  summary: string
}
type CollapsibleAccordionPropsType = {accordions: AccordionType[]; header?: ReturnType<React.FC>}

export const CollapsibleAccordion: React.FC<CollapsibleAccordionPropsType> = ({accordions, header}) => {
  return (
    <div>
      {header}
      {accordions.map((accordion, index) => {
        return (
          <Accordion
            disableGutters
            key={`accordion-${index}`}
            square={index === 0 && !!header}
            defaultExpanded={index === 0}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{accordion.summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>{accordion.details}</AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
