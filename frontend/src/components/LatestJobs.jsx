import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'

function LatestJobs() {
    const { allJobs } = useSelector(store => store.job)
    return (
        <div className='max-w-7xl mx-auto my-20 items-center'>
            <h1 className='text-4xl font-bold'> Latest Job Openings</h1>
            {/* multiple job card display here  */}
            <div className='grid grid-cols-3 gap-4 my-5 '>
                {
                    allJobs.map((job) => (
                        <LatestJobCard  key={job._id} job={job}/>
                    ))
                }
            </div>

        </div>
    )
}

export default LatestJobs
