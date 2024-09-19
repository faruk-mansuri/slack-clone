import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

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
import { useAuthActions } from '@convex-dev/auth/react'

interface SignUpCardProps {
  setState: (state: SignInFlow) => void
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setIsPending(true)
    setError('')
    console.log({ form })

    signIn('password', { ...form, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong.')
      })
      .finally(() => {
        setIsPending(false)
      })
  }

  const onProviderSignUp = (value: 'github' | 'google') => {
    setIsPending(true)
    setError('')
    signIn(value).finally(() => {
      setIsPending(false)
    })
  }

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
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
        <form onSubmit={onPasswordSignUp} className='space-y-2.5'>
          <Input
            disabled={isPending}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder='Full Name'
            required
          />

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

          <Input
            disabled={isPending}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            placeholder='Confirm Password'
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
            onClick={() => onProviderSignUp('google')}
            disabled={isPending}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute left-2.5' />
            Continue with Google
          </Button>

          <Button
            onClick={() => onProviderSignUp('github')}
            disabled={isPending}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute left-2.5' />
            Continue with GitHub
          </Button>
        </div>

        <p
          onClick={() => setState('signIn')}
          className='text-xs text-muted-foreground text-center'
        >
          Already have an account ?{' '}
          <span className='text-sky-700 hover:underline cursor-pointer'>
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUpCard
