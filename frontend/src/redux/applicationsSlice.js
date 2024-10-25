import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    updateApplicationStatus:"pending",
    loading: false, // Add loading state
    error: null   ,  // Add error state (optional)
    appliedJobs :[]
  },
  reducers: {
    // actions
    setApplications: (state, action) => {
      state.applications = action.payload;
      state.loading = false;  // Set loading to false when applications are set
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Manages loading state
    },
    setError: (state, action) => {
      state.error = action.payload;   // Manages error state (optional)
      state.loading = false;          // Set loading to false if there's an error
    },
    setUpdateApplicationStatus: (state, action) => {
      state.updateApplicationStatus = action.payload;   // Manages error state (optional)
     
    },
    setAppliedJobs :(state,action)=>{
      state.appliedJobs = action.payload
    }
  }
});

export const { setApplications, setLoading, setError,setUpdateApplicationStatus,setAppliedJobs} = applicationsSlice.actions;
export default applicationsSlice.reducer;
