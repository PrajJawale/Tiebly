import { JOB_API_END_POINT } from '@/components/constant'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true })  // corrected here
                if (res.data.success) {
                    // console.log(res)
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log("Error to fetch the jobs")
            }
        }
        fetchAllJob()
    }, [dispatch])

}

export {useGetAllJobs}
