import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

function NavBar() {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={36} height={36} />

        </Link>
        <h3 className='text-xl'>SyncPad</h3>

      </div>
      <SearchInput />

      <div className='flex gap-3 items-center'>
        <OrganizationSwitcher afterCreateOrganizationUrl="/"
        afterLeaveOrganizationUrl='/'
        afterSelectOrganizationUrl="/"
        afterSelectPersonalUrl="/"
        />
        <UserButton />

      </div>

    </nav>
  )

}

export default NavBar