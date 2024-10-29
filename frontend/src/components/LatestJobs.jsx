import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LatestJobs() {
    const navigate = useNavigate();
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl items-center m-10 '>
            <h1 className='text-4xl font-bold'>Latest Job Openings</h1>
            {/* Multiple job cards displayed here */}
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.map((job) => (
                       <div onClick={()=>navigate(`/description/${job._id}`)}>
                           <LatestJobCard 
                           // Ensure leading slash
                            key={job._id} 
                            job={job}
                            className="cursor-pointer" // Optional: Add for hover effect
                        />
                       </div>
                        
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJobs;
