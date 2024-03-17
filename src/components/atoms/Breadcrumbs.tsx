import React from 'react'
import {Breadcrumbs as MuiBreadcrumbs, Typography} from '@mui/material'
import {Link} from './StyledComponents'
import {NavigateNext} from '@mui/icons-material'

type BreadcrumbsPropsType = {links: Array<{link: string; name: string}>; text: string}

export const Breadcrumbs: React.FC<BreadcrumbsPropsType> = ({links, text}) => {
  return (
    <MuiBreadcrumbs separator={<NavigateNext />}>
      {links.map(({link, name}) => (
        <Link href={link} key={link}>
          {name}
        </Link>
      ))}
      <Typography>{text}</Typography>
    </MuiBreadcrumbs>
  )
}
