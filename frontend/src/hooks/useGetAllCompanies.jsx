import { COMPANY_API_END_POINT } from '@/components/constant'
import { setCompanies} from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany`,{withCredentials:true});
                // console.log('called');
                // console.log(res.data)
                if(res.data.success){
                  dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[dispatch])
}

export default useGetAllCompanies