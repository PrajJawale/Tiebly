import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { appliedJobs } = useSelector((store) => store.application);

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobs.map((jobItem) => (
                        <TableRow key={jobItem._id}>
                            <TableCell>{jobItem.createdAt.split('T')[0]}</TableCell>
                            <TableCell>{jobItem?.job?.title}</TableCell>
                            <TableCell>{jobItem?.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    className={
                                        jobItem?.status === 'accepted'
                                            ? 'bg-green-100 text-green-600'
                                            : jobItem?.status === 'rejected'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-yellow-100 text-yellow-600' // Default for other statuses (e.g., pending)
                                    }
                                >
                                    {jobItem?.status.charAt(0).toUpperCase() + jobItem?.status.slice(1)} {/* Capitalize the first letter */}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
