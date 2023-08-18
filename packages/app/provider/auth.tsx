import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'; // Replace with your Supabase client setup
import { User, UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'solito/router';

interface AuthContextType {
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
}
// Create a context for the authentication
const AuthContext = createContext<AuthContextType | null>(null)

// Create a custom hook to access the authentication context
export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

// AuthProvider component
export function AuthProvider({ children }: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        setIsLoading(false)
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    });
    checkUser()
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const response: UserResponse = await supabase.auth.getUser()
      const user = response?.data?.user
      if (user) {
        setIsAuthenticated(true)
        setUser(user)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}