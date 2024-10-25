import { APPLICATION_API_END_POINT } from '@/components/constant';
import { setApplications, setLoading, setError } from '@/redux/applicationsSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useGetApplicantByJobId(jobId) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobId) {
      console.log("JobId not exist");
      return;
    }

    const fetchApplicants = async () => {
      try {
        dispatch(setLoading(true)); // Set loading to true before API call

        console.log("Before API call");
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });

        if (res) {
          console.log("API called", res);
          dispatch(setApplications(res?.data?.job?.application)); // Set applications in Redux
        }
      } catch (error) {
        console.log("Error fetching the applicants: ", error);
        dispatch(setError("Failed to fetch applicants")); // Set error state
      } finally {
        dispatch(setLoading(false)); // Set loading to false in both success and failure cases
      }
    };

    fetchApplicants();
  }, [jobId, dispatch]); // Add jobId and dispatch as dependencies
}

export { useGetApplicantByJobId };
