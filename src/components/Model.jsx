'use client'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import {togglemodel} from '../redux/counterSlice'
import axios from 'axios';
import { toast,Toaster } from 'react-hot-toast';



const Model = ({ buttonName = "Edit" }) => {

  const isOpen = useSelector((state) => state.counter.openModel)
  const dispatch = useDispatch();
  const [defaultData, setDefaultData] = useState({})
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')
  const editHanlder = async () => {

    try {
      const data = await axios.put('/api/todo/updatetodo',{title,description, _id: id})
      if(data.data.success)
      toast.success("Data update Successfully");
      else {
        toast.error(data.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  let temp  = '';
  temp = useSelector((state) => state.counter.data)
  useEffect(()=>{
    if(temp !== undefined) {
      setTitle(temp.title);
      setId(temp.id);
      setDescription(temp.description);
    }
  },[temp])
  return (
    <>
          <Toaster/>
        {
            isOpen && 
      <div className='model-container overflow-hidden w-48 h-48 md:h-2/6 md:w-2/6'>
        <div className='flex justify-around mt-2'>
          <h1 className='bodyt font-bold '>Open Model</h1>
          <ClearOutlinedIcon className='text-red-500 font-bold text-2xl' onClick={()=>dispatch(togglemodel())} />
        </div>

        <div  className='flex justify-center items-center flex-col mt-2'>
          <div>
            <input type="text" onChange={(e) => setTitle(e.target.value)} name='title' className='p-3 text-black w-auto ' placeholder='Title' value={title}  />
          </div>
          <div className='mt-5'>
            <input type="text" onChange={(e) => setDescription(e.target.value)} name='description' className='p-3 text-black w-auto' value={description} placeholder='description' />
          </div>

          <div className='w-full mt-4 flex justify-center '>
            <button className='px-10 py-2 text-center bg-green-500 rounded-xl outline-none   shadow-sm hover:border-2 hover:bg-transparent hover:border-green-500' onClick={editHanlder}>Edit</button>
          </div>
        </div>


      </div>
}
    </>
  )
}

export default Model