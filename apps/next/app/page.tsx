'use client'

import { UserScreen } from 'app/features/user/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <UserScreen />
    </>
  )
}
