'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error)
    
    let ptMessage = error.message
    if (error.message === 'Invalid login credentials') {
      ptMessage = 'E-mail ou senha incorretos.'
    } else if (error.message.includes('Email not confirmed')) {
      ptMessage = 'E-mail não confirmado.'
    }
    
    redirect(`/login?error=${encodeURIComponent(ptMessage)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
