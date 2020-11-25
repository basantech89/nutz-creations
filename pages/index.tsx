import React from "react";
import {isAuthenticated} from "../src/utils/common";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated()) {
      router.push('/profile')
    } else {
      router.push('/signin')
    }
  }, [])

  return null
}
