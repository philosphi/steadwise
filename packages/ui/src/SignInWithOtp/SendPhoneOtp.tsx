import { useState } from 'react'
import { YStack, Paragraph, Button, Input } from 'tamagui'

interface Props {
  handleSendPhoneOtp: (phoneNumber: string) => void
}

export const SendPhoneOtp: React.FC<Props> = ({
  handleSendPhoneOtp,
}) => {
  const [phone, setPhone] = useState('')

  return (
    <YStack
      borderRadius="$10"
      space
      paddingHorizontal="$7"
      paddingVertical="$6"
      width={350}
      shadowColor={'#00000020'}
      shadowRadius={26}
      shadowOffset={{ width: 0, height: 4 }}
      backgroundColor="$background"
    >
      <Paragraph size="$5" fontWeight={'700'} opacity={0.8} marginBottom="$1">
        {'Sign in to your account'}
      </Paragraph>
      {/* otp phone sign in option */}
      <Input
        autoCapitalize="none"
        placeholder="+1"
        onChangeText={(text) => {
          setPhone(text)
        }}
      />

      {/* send phone otp button */}
      <Button
        themeInverse
        onPress={() => {
          handleSendPhoneOtp(phone)
        }}
        hoverStyle={{ opacity: 0.8 }}
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        focusStyle={{ scale: 0.975 }}
      >
        {'Send Code'}
      </Button>
    </YStack>
  )
}