import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob:null,
        jobsByAdmin :[],
        serachJobByText:"",
        filterJob:"",
        serachJobInHeroFilter:"",
        fetchJobsByFilter:""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload
        }
        ,
        setJobsByAdmin:(state,action)=>{
            state.jobsByAdmin = action.payload
        },
        setSerchJobByText:(state,action)=>{
            state.serachJobByText = action.payload
        },
        setFilterJob:(state,action)=>{
            state.filterJob = action.payload
        },
        setSerachJobInHeroFilter:(state,action)=>{
            state.serachJobInHeroFilter = action.payload
        },
        setFetchJobsByFilter:(state,action)=>{
            state.fetchJobsByFilter = action.payload
        },
        


    }
});
export const { setAllJobs,setSingleJob,setJobsByAdmin,setSerchJobByText,setFilterJob ,setSerachJobInHeroFilter,setFetchJobsByFilter} = jobSlice.actions
export default jobSlice.reducer;