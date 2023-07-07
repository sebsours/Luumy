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
        <div className="h-screen bg-background flex justify-center items-center text-text">
        
            <div className="bg-accent rounded-lg w-80 md:w-96 pb-6">
                    <div className="mb-3 pl-4 pt-3">
                        <span className="font-semibold text-2xl">Signup</span>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input id="email" type="email" placeholder="Email" autoComplete="none"                                                                                                                                                    
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="username" className='font-medium'>Username</label>
                        <input id="username" type="text" placeholder="New Username" autoComplete="none"                                                                                                                                                    
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 w-full items-start px-4 gap-1">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input id="password" type="password" placeholder="New Password" autoComplete="none"
                            className="w-full text-accent rounded-sm p-1 focus:outline-none"
                            onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className='flex justify-center pt-1'>
                        <button className='w-full mx-4 bg-primary-button rounded hover:bg-violet-800 transition ease-in-out font-semibold py-0.5' onClick={e => handleSignUp(e)}>Create Account</button>
                    </div>

                

            </div>

        </div>
    )
}