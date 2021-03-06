import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'

declare interface IStatusWrapperProps {
  children: React.ReactElement
}

const StatusWrapper: React.FC<IStatusWrapperProps> = (props) => {
  const { status, error } = useSelector((state: RootState) => state.common)

  if (status === 'resolved' || status === 'idle') {
    return props.children
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'pending') {
    return <CircularProgress />
  } else {
    throw new Error(`Unsupported status ${status}`)
  }
}

export default StatusWrapper
