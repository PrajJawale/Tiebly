import { JOB_API_END_POINT } from '@/components/constant'
import { setJobsByAdmin } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobsByAdmin = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchJobsCreatedByAdmin = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                console.log('called');
                // console.log(res.data)
                if(res.data.success){
                  dispatch(setJobsByAdmin(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobsCreatedByAdmin();
    },[dispatch])
}

export default useGetAllJobsByAdmin