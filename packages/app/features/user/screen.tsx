import { Button, Paragraph, YStack } from '@my/ui'
import { useAuth } from 'app/provider/auth'
import React, { useEffect, useState } from 'react'
import { trpc } from 'app/utils/trpc'
import { signOut } from 'app/utils/supabase'
import { AuthGate } from 'app/utils/supabase/gate'
import { useUser } from '@supabase/auth-helpers-react'

export function UserScreen() {
  const { user } = useAuth()
  const utils = trpc.useContext()

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
