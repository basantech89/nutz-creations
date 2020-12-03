import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

import SignIn from '../../src/components/Form/SignIn'
import { RootState } from '../../src/store'

export default function SignInContainer() {
  const { status, error } = useSelector((state: RootState) => state.common)

  if (status === 'resolved' || status === 'idle') {
    return <SignIn />
  } else if (status === 'pending') {
    return <CircularProgress />
  } else if (status === 'rejected') {
    throw new Error(error.message)
  } else {
    return <Typography variant='h2'> Signin Page </Typography>
  }
}
