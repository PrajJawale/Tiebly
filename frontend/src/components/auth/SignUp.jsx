import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function SignUp() {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    });
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true // Ensure credentials like cookies are included
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to register. Please try again.');
        }finally{
            dispatch(setLoading(false))
        }
    };

    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-600 rounded-md p-4 my-10">
                <h1 className="text-red-600 font-bold">SignUp Now</h1>
                <div>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        name="fullname"
                        required
                        value={input.fullname}
                        onChange={changeEventHandler}
                        placeholder="Enter the Full Name"
                        autoComplete="fullname"
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="praj@gmail.com"
                        autoComplete="email"
                        required
                    />
                </div>
                <div>
                    <Label>Mobile Number</Label>
                    <Input
                        type="text"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="99999999999"
                        autoComplete="phoneNumber"
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
                        autoComplete="password"
                        required
                    />
                </div>
                <div className="my-2">
                    <Label>Choose Role</Label>
                    <RadioGroup className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                                
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
                            />
                            <Label>Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                            required
                        />
                    </div>
                </div>
                {
                    loading ? 
                    <Button className="bg-blue-600 w-full py-3"><Loader2 className='mr-2 h-4 animate-spin ' />Please wait ...</Button> 
                    : <Button type="submit" className="bg-blue-600 w-full py-3">Signup</Button>
                }
                <span>
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600">
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
}

export default SignUp;
