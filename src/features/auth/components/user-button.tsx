'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Loader, LogOut } from 'lucide-react'
import { useCurrentUser } from '../hooks/use-current-user'
import { useAuthActions } from '@convex-dev/auth/react'

const UserButton = () => {
  const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser()

  if (isLoading)
    return <Loader className='size-6 animate-spin text-muted-foreground' />

  if (!data) return null

  const { image, name } = data
  const avatarFallback = name!.charAt(0).toUpperCase()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='size-10 hover:opacity-75 transition'>
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className='text-black'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem onClick={signOut} className='h-10 cursor-pointer'>
          <LogOut className='size-4 mr-2' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
