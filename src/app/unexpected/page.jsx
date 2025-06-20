import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
   <div className="flex items-center justify-center min-h-screen">
    <p className="text-center text-lg">
      This email is already registered with password login. 
    </p>
    <Link  href="/auth"><span className='ml-2 underline text-blue-500 cursor-pointer'>Sign in</span></Link>
  </div>
  )
}

export default page
