import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import {
    setUpdateApplicationStatus

} from '@/redux/applicationsSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/components/constant';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";

function ApplicantTable() {
    const dispatch = useDispatch();
    const applications = useSelector((store) => store.application.applications || []);
    const [localApplications, setLocalApplications] = useState([]);

    const shortlistingStatus = ["Accepted", "Rejected"];

    useEffect(() => {
        setLocalApplications(applications);
    }, [applications]);

    const statusHandler = async (status, id) => {
        try {
            // Optimistically update the UI
            const updatedApplications = localApplications.map(app =>
                app._id === id ? { ...app, status } : app
            );
            setLocalApplications(updatedApplications);

            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });

            if (res.data.success) {
                dispatch(setUpdateApplicationStatus({ id, status }));
                toast.success(res.data.message);
            } else {
                setLocalApplications(applications);
                toast.error("Failed to update status");
            }
        } catch (error) {
            setLocalApplications(applications);
            toast.error(error.response?.data?.message || "Error updating status");
        }
    };

 
    const getStatusBadgeVariant = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return "bg-green-100 text-green-800 hover:bg-green-100/80";
            case 'rejected':
                return "bg-red-100 text-red-800 hover:bg-red-100/80";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
        }
    };

    return (
        <div className="overflow-auto max-h-[500px]">
            <h1 className='font-bold text-black text-xl mx-10'>Applicant {applications.length}</h1>
            <Table className="table-auto w-full border-collapse">
                <TableCaption className="text-lg font-semibold">A list of applicants for this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center px-4 py-2">Name</TableHead>
                        <TableHead className="text-center px-4 py-2">Email</TableHead>
                        <TableHead className="text-center px-4 py-2">Phone Number</TableHead>
                        <TableHead className="text-center px-4 py-2">Skills</TableHead>
                        <TableHead className="text-center px-4 py-2">Bio</TableHead>
                        <TableHead className="text-center px-4 py-2">Resume</TableHead>
                        <TableHead className="text-center px-4 py-2">Status</TableHead>
                        <TableHead className="text-center px-4 py-2">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {localApplications.length ? (
                        localApplications.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell className="text-center px-4 py-2 whitespace-normal overflow-hidden">
                                    {application.applicant.fullname}
                                </TableCell>
                                <TableCell className="text-center px-4 py-2 whitespace-normal overflow-hidden">
                                    {application.applicant.email}
                                </TableCell>
                                <TableCell className="text-center px-4 py-2">
                                    {application.applicant.phoneNumber}
                                </TableCell>
                                <TableCell className="text-center px-4 py-2 whitespace-normal overflow-hidden">
                                    {application.applicant.profile.skills?.join(', ') || 'N/A'}
                                </TableCell>
                                <TableCell className="text-center px-4 py-2 whitespace-normal overflow-hidden">
                                    {application.applicant.profile.bio || 'N/A'}
                                </TableCell>
                                <TableCell className="text-center px-4 py-2">
                                    <a
                                        href={application.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline cursor-pointer"
                                    >
                                        {application.applicant.profile.resumeOriginalName}
                                    </a>
                                </TableCell>
                                <TableCell className="text-center px-4 py-2">
                                    <Badge
                                        className={`${getStatusBadgeVariant(application.status)} font-medium`}
                                    >
                                        {application.status || 'Pending'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex w-full items-center px-2 py-1.5 rounded-md transition-colors ${application.status === status
                                                            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                            : 'hover:bg-gray-100 cursor-pointer'
                                                        }`}
                                                    onClick={() => {
                                                        if (application.status !== status) {
                                                            statusHandler(status, application._id);
                                                        }
                                                    }}
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                                No applicants found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantTable;