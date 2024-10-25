import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'


const AdminJobsTable = () => {
   
    const { jobsByAdmin , serachJobByText } = useSelector(store => store.job)
    const [filterJob, setFilterJob] = useState(jobsByAdmin)
    const navigate = useNavigate();
    useEffect(() => {
        const filteredJob = jobsByAdmin.filter((job) => {
          if (!serachJobByText) {
            return true;
          }
          const searchText = serachJobByText.toLowerCase();
          const companyName = job?.company?.name?.toLowerCase() || '';
          const jobTitle = job?.title?.toLowerCase() || '';
    
          // Filter based on company name or job title
          return companyName.includes(searchText) || jobTitle.includes(searchText);
        });
    
        setFilterJob(filteredJob);
      }, [serachJobByText, jobsByAdmin]);
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Posted Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.map((job) => (
                            <tr>
                                <TableCell>
                                  {job?.company?.name}
                                </TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job?.company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                  <Button className="bg-slate-700 hover:first-letter" onClick={()=>navigate(`/admin/job/${job?._id}/applicant`)} > See Applicant</Button>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable