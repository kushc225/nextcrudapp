'use client'
import React from 'react';
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import toast,{Toaster} from 'react-hot-toast'
import '../login/login.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Signup = () => {
 const [user,setUser] =useState({
        email : '',
        username : '',
        password : ''
    })
    let [color, setColor] = useState("white");
    let [loading, setLoading] = useState(false);
    const router = useRouter();
    const signupHanlder =async  () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/users/new',user);
            if(res.data.success){
                router.push('/login');
            }else {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.msg)            
        }finally{
            setLoading(false);
        }
    }
    return (

        <div className='form-container flex justify-center items-center flex-col'>
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
                    <h1>Signup</h1>
                </div>
                }
                <div className='flex items-center flex-col'>
                    <input onChange={e => setUser({...user,[e.target.name] : e.target.value})} name='username' type="email" 
                    value={user.username}
                    placeholder='Username' className='px-2 py-2 outline-none text-black rounded-xl shadow-md mt-4' />

                    <input onChange={e => setUser({...user,[e.target.name] : e.target.value})} name='email' type="email" 
                    value={user.email}
                    placeholder='Email' className='px-2 py-2 outline-none text-black rounded-xl shadow-md mt-4' />


                    <input name='password'
                    onChange={e => setUser({...user,[e.target.name] : e.target.value})}  
                    value={user.password}
                    type="password" placeholder='Password' className='px-2 py-2 text-black outline-none  rounded-xl shadow-md mt-4' />

                </div>



                <div onClick={signupHanlder} className ='bg-blue-500 px-12 mt-4 py-3 rounded-xl shadow-md hover:bg-transparent text-serif font-bold hover:border-blue-500'>
                    <button className=''>Sign Up</button>
                </div>
               
            </div>

        </div>
    )
}

export default Signup