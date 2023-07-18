'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Model from './Model'
const Headers = () => {
  const path = usePathname()
  return (
    <>
    <Model/>
    <div className='h-12' style={{background:'#A8A196'}}>
      <div className='flex justify-around items-center h-full'>
      <div>
        <h1 className='font-bold font-serif'>TODO</h1>
      </div>
      <div>

      <ul className='flex'>
        <li className='pl-2 md:text-md hover:border-b-2 hover:border-red-700'><Link href="/"></Link></li>
        <li className={`pl-2 ${path === '/login' && 'border-red-500 border-b-2'} md:text-md hover:border-b-2 hover:border-red-700`}><Link href="/login">Login</Link></li>
        <li className={`pl-2 ${path === '/signup' && 'border-red-500 border-b-2'} md:text-md hover:border-b-2 hover:border-red-700`}><Link href="/signup">Signup</Link></li>
        <li className={`pl-2 ${path === '/logout' && 'border-red-500 border-b-2'} md:text-md hover:border-b-2 hover:border-red-700`}><Link href="/logout">Logout</Link></li>
      </ul>
    </div>
      </div>
      </div>
  </>
  )
}

export default Headers