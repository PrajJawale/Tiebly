import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function Navbar() {
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        navigate("/")
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      <div className='bg-white fixed top-0 left-0 w-full z-50 shadow-md '>
        <div className='flex items-center justify-between mx-10 max-w-7xl h-16 px-4'>
          <div>
            <h1 className='text-2xl font-bold'>Tie<span className='text-red-600 font-bold'>bly</span></h1>
          </div>
          <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
              {
                user && user.role === 'recruiter' ? (
                  <>
                    <li><Link to="/admin/companies">Companies</Link></li>
                    <li><Link to="/admin/jobs">Jobs</Link></li>
                  </>
                ) :
                  (
                    <>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/jobs">Jobs</Link></li>
                      <li><Link to="/browse">Browse</Link></li>
                    </>
                  )
              }
            </ul>

            {
              user === null ? (
                <div className='flex items-center gap-3'>
                  <Link to="/login"><Button variant="outline">Login</Button></Link>
                  <Link to="/signup"><Button className="bg-red-600">SignUp</Button></Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user.name || "User"} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-gray-200 border border-gray-400 rounded-md shadow-sm my-2 mx-2">
                   <div className='m-3'>
                   <div className='flex gap-4'>
                      <Avatar>
                        <AvatarImage src={user?.profile?.profilePhoto} />
                      </Avatar>
                      <div>
                        <h1 className='font-medium'>{user.name || 'User'}</h1>
                        <p className='text-sm text-muted-foreground'>Welcome back!</p>
                      </div>
                    </div>

                    <div className='flex flex-col text-gray-600 '>
                      {
                        user && user.role === 'student' && (
                          <div className='flex w-fit items-center cursor-pointer gap-3'>
                            <User2 />
                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                          </div>
                        )
                      }

                      <div className='flex w-fit items-center cursor-pointer gap-3'>
                        <LogOut />
                        <Button onClick={handleLogout} variant="link"> Logout </Button>
                      </div>
                    </div>
                   </div>

                  </PopoverContent>
                </Popover>
              )
            }

          </div>
        </div>
      </div>
      
      {/* Spacer div to prevent content from going behind the navbar */}
      <div className='h-16'></div>
    </>
  )
}

export default Navbar
