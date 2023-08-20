import {
  Button,
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

export function AuthScreen() {
  const countQuery = trpc.count.getCount.useQuery();
  const countMutation = trpc.count.addCount.useMutation();
  const toast = useToastController()
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [phone, setPhone] = useState('')

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
