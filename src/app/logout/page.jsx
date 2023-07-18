'use client'
import React from 'react'
import './logout.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Logout = () => {
  const router = useRouter();
const logoutHanlder =async  () => {
  try {
    const res = await axios.get('/api/users/logout');
    if(res.data.success) {
      router.push('/login');
    }else{
      console.log(res.data.msg)
    }
    
  } catch (error) {
    console.log(error.message);
  }
}
  return (
    <div className='form-container'>
        <button className='px-2 py-2 bg-blue-500 shadow-sm rounded-xl hover:bg-transparent hover:border-2 hover:border-blue-500' onClick={logoutHanlder}>Logout</button>
    </div>
  )
}

export default Logout