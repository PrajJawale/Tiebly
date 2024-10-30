import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../constant';
import { toast } from 'sonner'; // Assuming you are using the `sonner` toast for notifications
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true // Ensure that credentials are sent in the request
            });
            console.log(res);
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/"); // Redirect to home after successful login
                toast.success(res.data.message); // Show success message
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed. Please try again."); // Show error message
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-600 rounded-md p-4 my-10">
                <h1 className='text-red-600 font-bold'>Login Now</h1>

                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="praj@gmail.com"
                        autoComplete="email"  // Added autocomplete attribute for email
                        required
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="abc@123"
                        autoComplete="password"  // Added autocomplete attribute for password
                    />
                </div>
                <div className='my-2'>
                    <Label>Choose Role</Label>
                    <RadioGroup className="flex items-center gap-4 ">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                                autoComplete="off"  // Radio buttons don't need autocomplete
                            />
                            <Label>Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                                autoComplete="off"  // Radio buttons don't need autocomplete
                            />
                            <Label>Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
                {
                    loading ? 
                    <Button className="bg-blue-600 w-full py-3"><Loader2 className='mr-2 h-4 animate-spin ' />Please wait ...</Button> 
                    : <Button type="submit" className="bg-blue-600 w-full py-3">Login</Button>
                }

                <span>Don't have an account? <Link to="/signup" className="text-red-600">Signup</Link></span>
            </form>
        </div>
    );
}

export default Login;
