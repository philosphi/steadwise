import { UserScreen } from '@steadwise/app/features/user/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <UserScreen />
    </>
  )
}
