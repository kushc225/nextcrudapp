'use client'
import React from 'react';
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import './login.css'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
 const [user,setUser] =useState({
        email : '',
        password : ''
    })
    let [color, setColor] = useState("white");
    let [loading, setLoading] = useState(false);
    const router = useRouter()

    const loginHanlder =async  () => {
        try {
            setLoading(true)
           const data = await axios.post('/api/users/login',user);
           console.log(data)
           if(data.data.success) {
            localStorage.setItem('token',data.data.token);
            router.push('/profile');
           }else {
            toast.error("Invalid Credential");
           }
        } catch (error) {
            toast.error(error.message)            
        }finally{
            setLoading(false);
        }
    }
    return (

        <div className='form-container flex flex-col justify-center items-center'>
            <Toaster/>
            <div className=' text-center'>

            <SyncLoader
                color={color}
                size={5}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
            </div>
            <div className='flex justify-center items-center flex-col'>
               {
                !loading&&
            
                <div>
                    <h1>Login</h1>
                </div>
                }
                <div className='flex flex-col justify-center items-center'>
                    <input onChange={e => setUser({...user,[e.target.name] : e.target.value})} name='email' type="email" 
                    value={user.email}
                    placeholder='Email' className='px-2 py-2 outline-none text-black rounded-xl shadow-md mt-4' />
                    <input name='password'
                    onChange={e => setUser({...user,[e.target.name] : e.target.value})}  
                    value={user.password}
                    type="password" placeholder='Password' className='px-2 py-2 text-black outline-none  rounded-xl shadow-md mt-4' />

                </div>



                <div onClick={loginHanlder} className ='bg-blue-500 px-12 mt-4 py-3 rounded-xl shadow-md hover:bg-transparent text-serif font-bold hover:border-2 hover:border-blue-500'>
                    <button className=''>Login</button>
                </div>
               
            </div>

        </div>
    )
}

export default Login