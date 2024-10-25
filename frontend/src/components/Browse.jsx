import React, { useEffect, useState } from 'react';
import Job from './Job';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';



function Browse() {
    const {allJobs} = useSelector(store=>store.job)
    const [filterJob,setFilterJob] = useState(allJobs)
    const {serachJobInHeroFilter} = useSelector(store=>store.job)
    useEffect(()=>{
        const filteredJob = allJobs.filter((job)=>{
            if(!serachJobInHeroFilter){
               return true
            }
            return job?.title?.toLowerCase().includes(serachJobInHeroFilter.toLowerCase()) || job?.company?.name.toLowerCase().includes(serachJobInHeroFilter.toLowerCase())
        })
        setFilterJob(filteredJob)
    },[serachJobInHeroFilter])
    return (
        <>
       
            <Navbar/>
            {/* Center container with proper margin */}
            <div className="flex flex-col items-center justify-center mx-auto max-w-7xl p-6">
            

                {/* Search result heading */}
                <h1 className="font-bold text-2xl mb-6">
                    Search Result ({filterJob.length})
                </h1>

                {/* Grid of job items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {filterJob.map((job) => (
                        <div key={job._id} >
                            <Job job={job}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Browse;
