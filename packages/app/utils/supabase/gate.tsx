'use client'

import React from 'react';
import { useAuth } from '../../provider/auth'
import { AuthScreen } from '@steadwise/app/features/auth/screen'

export const AuthGate: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return (<></>)

  if (!isAuthenticated) {
    return (<AuthScreen />)
  }

  return (<>{children}</>)
}