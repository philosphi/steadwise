import { useState } from 'react'
import { YStack, Paragraph, Button, Input } from 'tamagui'

interface Props {
  handleEmailWithPress: (emailAddress: string) => void
}

export const SignInWithEmail: React.FC<Props> = ({
  handleEmailWithPress,
}) => {
  const [emailAddress, setEmailAddress] = useState('')

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
      {/* email sign up option */}
      <Input
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(text) => {
          setEmailAddress(text)
        }}
      />

      {/* sign in button */}
      <Button
        themeInverse
        onPress={() => {
          handleEmailWithPress(emailAddress)
        }}
        hoverStyle={{ opacity: 0.8 }}
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        focusStyle={{ scale: 0.975 }}
      >
        {'Sign in'}
      </Button>
    </YStack>
  )
}