import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

import SignUp from '../../src/components/Form/SignUp'
import { RootState } from '../../src/store'

export default function SignUpContainer() {
  const { status, error } = useSelector((state: RootState) => state.common)

  if (status === 'resolved' || status === 'idle') {
    return <SignUp />
  } else if (status === 'pending') {
    return <CircularProgress />
  } else if (status === 'rejected') {
    throw new Error(error.message)
  } else {
    return <Typography variant='h2'> Signup Page </Typography>
  }
}
