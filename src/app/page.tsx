'use client'

import UserButton from '@/features/auth/components/user-button'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { Loader } from 'lucide-react'
const Home = () => {
  const { data, isLoading } = useCurrentUser()

  if (isLoading)
    return <Loader className='size-4 animate-spin text-muted-foreground' />

  if (!data) return null

  const { image, name, email } = data
  return (
    <div>
      <UserButton />
    </div>
  )
}

export default Home
