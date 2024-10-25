import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicantTable from './ApplicantTable';
import { useGetApplicantByJobId } from '@/hooks/useGetApplicantByJobId';

function JobApplicant() {
    const navigate = useNavigate();
  
    const param = useParams();  // Assuming `id` is the param in the route ("/admin/job/:id/applicant")
    const jobId = param.id
    console.log("Job ID from URL:", jobId);

    // Pass jobId as a string (not an object) to the hook
    useGetApplicantByJobId(jobId);  

  return (
    <div>
      <div className='m-10'>
        <Button onClick={() => navigate("/admin/jobs")}>
          <ArrowLeft />
        </Button>
      </div>
      <div>
        <ApplicantTable />
      </div>
    </div>
  );
}

export default JobApplicant;
