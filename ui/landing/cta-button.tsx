import React from 'react'
import { auth } from '@/auth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function CTAButton ()
{
  const session = await auth()

  if ( !session?.user ) return ( <Link
    href="/login"
    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
  >
    <span>Log in</span> <ArrowRightIcon className="!w-5 md:w-6" />
  </Link> )


  return (
    <Link
      href="/admin"
      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    >
      <span>Dashboard</span> <ArrowRightIcon className="!w-5 md:w-6" />
    </Link>
  )
}