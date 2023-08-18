import { supabase } from './init'

const signInWithEmail = async (email: string) => {
  const { data: { user }, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'localhost:3000/user',
    }
  })

  return { user, error }
}

const sendPhoneOtp = async (phone: string) => {
  const { data: { user }, error } = await supabase.auth.signInWithOtp({
    phone
  })

  return { user, error }
}

const verifyPhoneOtp = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" })

  return { data, error }
}

const signOut = async () => {
  await supabase.auth.signOut()
}

const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}

export {
  supabase,
  signInWithEmail,
  sendPhoneOtp,
  verifyPhoneOtp,
  signOut,
  getUser,
}