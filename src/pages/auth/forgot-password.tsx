import type {NextPage} from 'next'
import React, {useState} from 'react'
import {ResetPassword, VerifyOtp} from '../../templates/accounts'
import {Config} from '../../config'
import {CenteredContainer, Link} from '../../atoms'
import {useMedia} from '../../hooks'
import {Stack, Typography} from '@mui/material'

const ForgotPasswordPage: NextPage = () => {
  const [otpVerified, setOtpVerified] = useState(false)
  const media = useMedia()

  return (
    <CenteredContainer>
      {otpVerified ? (
        <ResetPassword title={'Change password'} withOldPassword={false} redirectTo={Config.LOGIN_PAGE_PATH} />
      ) : (
        <VerifyOtp title={'Forgot password'} setOtpVerified={setOtpVerified} />
      )}
      <Stack
        direction={media.md ? 'row' : 'column'}
        justifyContent={'space-between'}
        alignItems={media.md ? 'center' : 'start'}
        spacing={1}
        m={2}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography>Already have an account?</Typography>
          <Link href={Config.LOGIN_PAGE_PATH}>Login</Link>
        </Stack>
      </Stack>
    </CenteredContainer>
  )
}

export default ForgotPasswordPage
