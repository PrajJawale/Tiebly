import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

import { Input } from '../ui/input'
import useGetAllJobsByAdmin from '@/hooks/useGetAllJobsByAdmin'
import { setSerchJobByText } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'
import { ArrowLeft } from 'lucide-react'
import AdminJobsTable from './AdminJobsTable'

function JobCreatedByAdmins() {
  const navigate = useNavigate()
  const [input , setInput] = useState()
  const dispatch = useDispatch()
  useGetAllJobsByAdmin()
  useEffect(()=>{
     dispatch(setSerchJobByText(input))
  },[input])
  return (
    <div>
      <div className='flex items-center justify-between mx-10 my-10'>
        <Button onClick={() => navigate("/admin/companies")}><ArrowLeft/></Button>
        <div className='w-2/5'>
          <Input
            placeholder="Search by Company Name or Role"
            name = "filter"
            onChange ={(e)=>setInput(e.target.value)}
          />
        </div>
        <Button onClick={()=>navigate("/admin/jobs/create")}>Create New Job</Button>
      </div>

      <div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default JobCreatedByAdmins
