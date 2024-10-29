import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
    const navigate = useNavigate()
    const daysAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime)
        const currTime = new Date()
        const timeDiff = currTime - createdAt
        return Math.floor((timeDiff)/(1000*24*60*60))
    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'> {daysAgoFunction(job?.createdAt?.split("T")[0])} Days Ago </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-5 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOo6QUm_jVtraBc_hltQIeZMq4m_Wv8uTFcg&s" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.posotion} Position</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.title}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick = {()=>(navigate(`/description/${job._id}`))}  variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
  )
}

export default Job


