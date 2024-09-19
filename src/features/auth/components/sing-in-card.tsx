import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useAuthActions } from '@convex-dev/auth/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { SignInFlow } from '../types'
import { TriangleAlert } from 'lucide-react'

interface SignInCardProps {
  setState: (state: SignInFlow) => void
}
const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError('')

    signIn('password', { ...form, flow: 'signIn' })
      .catch(() => {
        setError('Invalid email or password.')
      })
      .finally(() => {
        setIsPending(false)
      })
  }

  const onProviderSignIn = (value: 'github' | 'google') => {
    setIsPending(true)
    setError('')
    signIn(value).finally(() => {
      setIsPending(false)
    })
  }

  return (
    <Card className='p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className='bg-destructive/15 opacity-50 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={onPasswordSignIn} className='space-y-2.5'>
          <Input
            disabled={isPending}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='Email'
            type='email'
            required
          />
          <Input
            disabled={isPending}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder='Password'
            type='password'
            required
          />

          <Button
            type='submit'
            className='w-full'
            size='lg'
            disabled={isPending}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={isPending}
            onClick={() => onProviderSignIn('google')}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute left-2.5' />
            Continue with Google
          </Button>

          <Button
            disabled={isPending}
            onClick={() => onProviderSignIn('github')}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute left-2.5' />
            Continue with GitHub
          </Button>
        </div>

        <p
          onClick={() => setState('singUp')}
          className='text-xs text-muted-foreground text-center'
        >
          Don&apos;t have an account ?{' '}
          <span className='text-sky-700 hover:underline cursor-pointer'>
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard
