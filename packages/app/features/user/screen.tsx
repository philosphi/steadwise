'use client'

import { Button, Paragraph, YStack } from '@steadwise/ui'
import { useAuth } from '@steadwise/app/provider/auth'
import React from 'react'
import { signOut } from '@steadwise/app/utils/supabase'
import { AuthGate } from '@steadwise/app/utils/supabase/gate'

export function UserScreen() {
  const { user } = useAuth()

  return (
    <AuthGate>
      <YStack f={1} jc="center" ai="center" space>
        <Paragraph ta="center" fow="700">{`User Id: ${user?.id}`}</Paragraph>
        <Button
          onPress={async () => {
            await signOut()
          }}
          space="$2"
        >
          Sign Out
        </Button>
      </YStack>
    </AuthGate>
  )
}
