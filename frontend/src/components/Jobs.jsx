// Jobs.js
import React, { useEffect, useState } from 'react';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

function Jobs() {
    const { allJobs, fetchJobsByFilter } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(() => {
        if (fetchJobsByFilter && Object.keys(fetchJobsByFilter).length > 0) {
            const result = allJobs.filter((job) => {
                return (
                    ( job?.location?.toLowerCase().includes(fetchJobsByFilter.toLowerCase())) ||
                    ( job?.title?.toLowerCase().includes(fetchJobsByFilter.toLowerCase())) ||
                    ( job?.description?.toLowerCase().includes(fetchJobsByFilter.toLowerCase()))
                );
            });
            setFilteredJobs(result);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, fetchJobsByFilter]);

    return (
        <div className="flex items-start justify-between m-6 pt-4 gap-6">
            <div className="w-[20%]">
                <FilterCard />
            </div>
            <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <div key={job?._id}>
                        <Job job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
