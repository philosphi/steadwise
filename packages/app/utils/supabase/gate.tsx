import React, { useEffect } from 'react';
import { useAuth } from '../../provider/auth'
import { useRouter } from 'solito/router'

export const AuthGate: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { push } = useRouter();
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (!isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) return (<></>)

  return (isAuthenticated ? <>{children}</> : <></>)
}