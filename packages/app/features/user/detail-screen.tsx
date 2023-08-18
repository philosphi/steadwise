import { Button, Paragraph, YStack } from '@my/ui'
import { useAuth } from 'app/provider/auth'
import React, { useEffect, useState } from 'react'
import { trpc } from 'app/utils/trpc'
import { signOut } from 'app/utils/supabase'
import { useRouter } from 'solito/router'
import { AuthGate } from 'app/utils/supabase/gate'

export function UserDetailScreen() {
  const sessionQuery = trpc.auth.getSession.useQuery()
  const sessionUser = sessionQuery?.data
  const utils = trpc.useContext()

  return (
    <AuthGate>
      <YStack f={1} jc="center" ai="center" space>
        <Paragraph ta="center" fow="700">{`User Id: ${sessionUser?.id}`}</Paragraph>
        <Button
          onPress={async () => {
            // TODO: Clear tanstack query cache of authenticated routes
            utils.auth.secretMessage.setData(undefined, undefined)
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
