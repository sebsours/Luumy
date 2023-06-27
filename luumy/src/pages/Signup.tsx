import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup()
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e:React.MouseEvent) => {
        e.preventDefault();

        if (username && email && password)
        {
            const url = 'http://localhost:8000/signup';
            await axios.post(url, {
                username: username, 
                email: email,
                password: password
            })
                .then((response):any => {
                    handleLogin();

                })
                .catch((error):any => console.log(error));
        }

    }

    const handleLogin = async () => {
        if (username && password)
        {
            const url = 'http://localhost:8000/login'
            await axios.post(url, {
                username: username,
                password: password
            }, {withCredentials: true})
                .then((response) => {
                    console.log(response.data);
                    navigate(`/user/${response.data.userInfo.username}`);
                })
                .catch((error):any => {
                    console.log(error);
                })
            
        }
    }

    return(
        <div className="h-screen bg-purple-200 flex justify-center items-center">
        
            <div className="bg-purple-300 rounded-sm w-1/5">
                
                <div className="p-6">
                    <div className="mb-3">
                        <span className="text-2xl font-semibold">Signup</span>
                    </div>

                    <div className="flex flex-col mb-3 gap-1">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Email" autoComplete="none"                                                                                                                                                    
                            className="w-full rounded-sm p-1 focus:outline-none"
                            onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 gap-1">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="New Username" autoComplete="none"                                                                                                                                                    
                            className="w-full rounded-sm p-1 focus:outline-none"
                            onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 gap-1 ">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="New Password" autoComplete="none"
                            className="w-full rounded-sm p-1 focus:outline-none"
                            onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className='w-full mb-3'>
                        <button className='w-full bg-purple-500 rounded py-1.5' onClick={e => handleSignUp(e)}>Create Account</button>
                    </div>
                    
                    {/* <div>
                        <p>Don't have an account? <span onClick={()=> console.log('hello')} className='text-purple-50 cursor-pointer'>Create an account</span> </p>
                        
                    </div> */}

                </div>

            </div>

        </div>
    )
}