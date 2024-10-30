'use server'
import { signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    if (
      error !== null &&
      typeof error === 'object' &&
      'toString' in error &&
      error.toString().replace('Error: ', '') !== 'NEXT_REDIRECT'
    ) {
      throw error
    }
  }
  return redirect('/admin')
}
