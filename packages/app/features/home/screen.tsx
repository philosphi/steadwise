import {
  Button,
  Paragraph,
  Sheet,
  useToastController,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { trpc } from 'app/utils/trpc'
import { sendPhoneOtp, verifyPhoneOtp } from 'app/utils/supabase'
import Constants from 'expo-constants'
import { SendPhoneOtp } from '@my/ui/src/SignInWithOtp/SendPhoneOtp'
import { VerifyPhoneOtp } from '@my/ui/src/SignInWithOtp/VerifyPhoneOtp'
import { useRouter } from 'solito/router'
import { useAuth } from 'app/provider/auth'


export function HomeScreen() {
  const { isAuthenticated } = useAuth()
  const { push } = useRouter()
  const countQuery = trpc.count.getCount.useQuery();
  const countMutation = trpc.count.addCount.useMutation();
  const toast = useToastController()
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      push("/user")
    }
  }, [isAuthenticated])

  const handleSendPhoneOtp = async (phone: string) => {
    const { error } = await sendPhoneOtp(phone)

    if (error) {
      const isExpoGo = Constants.appOwnership === 'expo'
      if (!isExpoGo) {
        toast.show('Failed to send code', {
          description: error.message,
        })
      }
      return
    }

    setIsOtpSent(true)
    setPhone(phone)
  }

  const handleVerifyPhoneOtp = async (token: string) => {
    const { error } = await verifyPhoneOtp(phone, token)

    if (error) {
      const isExpoGo = Constants.appOwnership === 'expo'
      if (!isExpoGo) {
        toast.show('Failed to verify code', {
          description: error.message,
        })
      }
      return
    }
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <Paragraph>You clicked me {countQuery.data?.body} times.</Paragraph>
        <Button onPress={() => countMutation.mutate()} disabled={countMutation.isLoading}>
          <Paragraph>Click me!</Paragraph>
        </Button>
      </YStack>

      <YStack flex={1} justifyContent="center" alignItems="center" space>
        {isOtpSent ?
          <VerifyPhoneOtp handleVerifyPhoneOtp={handleVerifyPhoneOtp} />
          :
          <SendPhoneOtp handleSendPhoneOtp={handleSendPhoneOtp} />
        }
      </YStack>

      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
