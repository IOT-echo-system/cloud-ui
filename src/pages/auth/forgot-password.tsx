import type {NextPage} from 'next'
import React, {useState} from 'react'
import {ResetPassword, VerifyOtp} from '../../templates/accounts'
import {Config} from '../../config'

const ForgotPasswordPage: NextPage = () => {
  const [otpVerified, setOtpVerified] = useState(false)

  if (otpVerified) {
    return <ResetPassword title={'Change password'} withOldPassword={false} redirectTo={Config.LOGIN_PAGE_PATH} />
  }
  return <VerifyOtp title={'Forgot password'} setOtpVerified={setOtpVerified} />
}

export default ForgotPasswordPage
