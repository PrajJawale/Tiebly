import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Description from './components/Description'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CreateCompanySetup from './components/admin/CreateCompanySetup'
import JobCreatedByAdmins from './components/admin/jobCreatedByAdmins'
import JobApplicant from './components/admin/JobApplicant'
import PostJob from './components/admin/PostJob'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<Description/>
  },

  //routes for admins works 
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CreateCompany/>
  },
  {
    path:"/admin/companies/:id",
    element:<CreateCompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<JobCreatedByAdmins/>
  },
  {
    path:"/admin/job/:id/applicant",
    element:<JobApplicant/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  }
  

])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
