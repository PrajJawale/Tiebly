import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

function LatestJobCard({job}) {
    const navigate = useNavigate()
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <div className="mb-2">
                <h1 className="text-xl font-bold">{job?.company?.name}</h1>
                <p className="text-gray-600">India</p>
            </div>
            <div className="mb-4">
                <h1 className="text-lg font-semibold">{job?.title}</h1>
                <p className="text-gray-700">{job?.discription}</p>
            </div>
            <div className="flex gap-2">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.posotion} Position</Badge>
                <Badge className="text-red-700 font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-purple-700 font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCard;
