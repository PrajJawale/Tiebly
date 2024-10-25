import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSerachJobInHeroFilter } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const [ input,setInput] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
       dispatch(setSerachJobInHeroFilter(input))
    },[input])
    const searchJob = ()=>{
        navigate("/browse")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='text-red-700 bg-gray-200 rounded-full font-medium py-2 px-4 mx-auto'>No.1 Job Site </span>
                <h1 className='text-5xl font-bold '>Search,Apply & <br /> Get Your <span className='text-purple-700'> Dream Jobs</span>  </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus impedit cumque deserunt tenetur perferendis laborum.</p>
            </div>
            <div className='flex w-[40%] items-center mx-auto shadow-lg border border-gray-600 rounded-full gap-4 '>
                 <input
                   type="text"
                   placeholder="Find your dream job"
                   className="w-full outline-none border-none mx-3 "
                   onChange={(e)=> setInput(e.target.value)}
                 />
                 <Button onClick={searchJob} className=" h-full rounded-r-full bg-blue-700"> 
                    <Search className="h-5 w-5" />
                 </Button>
            </div>

        </div>
    )
}

export default HeroSection
