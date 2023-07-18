'use client'
import React,{useEffect, useState} from 'react'
import './todo.css'
import axios from 'axios'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {togglemodel} from '../../redux/counterSlice'
import List from '../../components/List'
import { toast,Toaster } from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import { useRouter } from 'next/router';
const Todo = () => {
    const [description,setDescription] = useState('')
    const [title,setTitle] = useState('')
    const [notes,setNotes] = useState([])
    const [id,setId] = useState('')
    const [isAdd,setIsAdd] =  useState(true);
    const isOpen = useSelector((state) => state.counter.openModel)
    const dispatch = useDispatch();
    const editHanlder = async (id) => {
      try {
        setId(id);
        const res = await axios.post('api/todo/findone',{id})
        if(!res.data.success) {
          toast.error(res.data.msg);
          return;
        }
        setTitle(res.data.list.title)
        setDescription(res.data.list.description)
        setIsAdd(false);
      } catch (error) {
        toast.error(error.message);
      }
    }

    const delHanlder = async (id ) => {
      try {
        console.log(id);
        if(!id) {
          toast.error("Something Went Wrong");
        }
        const resp = await axios.delete(`/api/todo/delete/${id}`);
        console.log(resp.data)
        if(resp.data.success){
          toast.success("Task Deleted Successfully");
          await fetchAllNotes();
          setTitle('')
          setDescription('')
        }else {
          toast.error("Failed to delete task ");

        }
        setIsAdd(true);
      } catch (error) {
        toast.error(error.message);
      }
    }
    
    const fetchAllNotes = async() => {
      try {
        const data = await axios.get('/api/todo/list');
        if(data.data.success){
          setNotes(data.data.list);
        }else {
          toast.error("data not found")
        }
  
      } catch (error) {
        toast.error(error.message)
      }
    }
    
    const notesHanlder =async  (flag) => {
      try {
        const token = localStorage.getItem('token');    
        if(flag){
          try {
            const res = await axios.post('/api/todo/new',{token,title,description})
            if(res.data.success) {
              await fetchAllNotes();
              setTitle("")
              setDescription("")
              // console.log(res.data.list);
            }
          } catch (error) {
            toast.error('list validation failed: title: Please provide a title, description: Please provide a description');
          }
         
        }else {
          const data = await axios.put('/api/todo/updatetodo',{title,description,id})
          if(data.data.success) {
            await fetchAllNotes();
            setTitle("")
            setDescription("")
            toast.success("Data updated Successfully")
          }
          else {
            toast.error("falied to update todo");
          }
          setIsAdd(true);
        }
    } catch (error) {
        console.log(error.message);
      }
    }
    useEffect(()=> {
      fetchAllNotes();
    },[])
  return (
    <>
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
   <div className='form-container w-full  h-auto'>
    <Toaster/>
    <div className=' flex-col flex justify-center items-center'>
    <div>

    <input type="text" onChange={(e)=>setTitle(e.target.value)} name='title' value={title} className='p-3 text-black w-auto md:w-96' placeholder='Title'  />
   </div>
    <div className='mt-4 '>

    <input type="text"  onChange={(e)=>setDescription(e.target.value)} name='description'  value={description} className='p-3 text-black w-auto md:w-96' placeholder='description'  />
   </div>
   <div className='w-full mt-4 flex justify-center'>
    <button className={`px-10 py-2 text-center ${isAdd ? '  bg-blue-500 hover:bg-transparent hover:border-blue-500' : 'bg-green-500  hover:bg-transparent hover:border-green-500'}  rounded-xl shadow-sm hover:border-2  `} onClick={()=> notesHanlder(isAdd)}>{isAdd ? "Add" : "Edit"}</button>
   </div>

   <div className=' mt-4 w-full h-auto  flex flex-wrap   justify-center'>
    {
      notes.map((item)=>(
        <List delHanlder = {delHanlder} key={item._id} editHanlder = {editHanlder} setIsAdd = {setIsAdd} owner = {item.owner} id={item._id}  title={item.title} description={item.description} />
        
        ))
      }
   

    </ div>
   </div>
    </div>
      </>

  )
}

export default Todo