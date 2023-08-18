import { useState } from 'react'
import { YStack, Paragraph, Button, Input } from 'tamagui'

interface Props {
  handleVerifyPhoneOtp: (token: string) => void
}

export const VerifyPhoneOtp: React.FC<Props> = ({
  handleVerifyPhoneOtp,
}) => {
  const [otp, setOtp] = useState('')

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
      <Paragraph>Enter the 6 digit code sent to your phone</Paragraph>
      <Input
        autoCapitalize="none"
        onChangeText={(text) => {
          setOtp(text)
        }}
      />
      {/* send phone otp button */}
      <Button
        themeInverse
        onPress={() => {
          handleVerifyPhoneOtp(otp)
        }}
        hoverStyle={{ opacity: 0.8 }}
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        focusStyle={{ scale: 0.975 }}
      >
        {'Verify Code'}
      </Button>
    </YStack >
  )
}