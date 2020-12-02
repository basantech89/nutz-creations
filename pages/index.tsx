import { useRouter } from 'next/router'
import React from 'react'

import { isAuthenticated } from '../src/utils/common'

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated()) {
      router.push('/profile')
    } else {
      router.push('/signin')
    }
  }, [router])

  return null
}
