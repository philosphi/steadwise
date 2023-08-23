'use client'

import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import React from 'react'
import { Provider } from '@steadwise/app/provider'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheet } from 'react-native'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

import configBase from '../tamagui.config';

const tamaguiNextConfig = {
  ...configBase,
  themeClassNameOnRoot: false,
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
        <style
          dangerouslySetInnerHTML={{
            __html: tamaguiNextConfig.getNewCSS({
              // if you are using "outputCSS" option, you should use this "exclude"
              // if not, then you can leave the option out
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />
      </>
    )
  })

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  )
}
