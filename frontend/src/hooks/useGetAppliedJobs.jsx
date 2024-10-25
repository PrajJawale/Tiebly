import { APPLICATION_API_END_POINT } from '@/components/constant'
import { setAppliedJobs } from '@/redux/applicationsSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log('called');
                console.log(res.data)
                dispatch(setAppliedJobs(res.data.application))
               
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[dispatch])
}

export default useGetAppliedJobs