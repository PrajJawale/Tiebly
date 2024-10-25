import { COMPANY_API_END_POINT } from '@/components/constant'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetSingleCompany({companyID}) {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany/${companyID}`, { withCredentials: true })  
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log("Error to fetch the single company")
            }
        }
        fetchSingleCompany()
    }, [companyID,dispatch])

}

export {useGetSingleCompany}
