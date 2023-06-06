// import { useState, useCallback } from 'react';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthProps
{
    handleToken: (token:string) => void;
}

export default function Auth(props: AuthProps){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username && password)
        {
            const url = 'http://localhost:8000/login'
            await axios.post(url, {
                username: username,
                password: password
            })
                .then((response) => {
                    console.log(response.data);
                    props.handleToken(response.data.token);
                    navigate(`/user/${response.data.userInfo.username}`);
                })
                .catch((error):any => {
                    console.log(error);
                })
            
        }
        // console.log("wtf");
    }

    return (
        <div className="h-screen bg-purple-200 flex justify-center items-center">
            <div className='pr-48'>
                <span className='text-9xl'>
                    <NightsStayIcon fontSize='inherit'/>
                    <span className='text-7xl font-extralight'>Luumy</span>
                </span>
                
                <p className='text-lg font-extralight mt-5'>Keep track of all the albums you listened to and love
                    </p>
                <p className='text-sm font-light text-right mt-1'>Uses Spotify's WebAPI</p>
            </div>

            <div className="bg-purple-300 rounded-sm w-1/5">
                
                <div className="p-6">
                    <div className="mb-3">
                        <span className="text-2xl font-semibold">Login</span>
                    </div>
                    

                    <div className="flex flex-col mb-3 gap-1">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="Username" autoComplete="none"                                                                                                                                                    
                            className="w-full rounded-sm p-1 focus:outline-none"
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-3 gap-1 ">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" autoComplete="none"
                            className="w-full rounded-sm p-1 focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className='w-full mb-3'>
                        <button className='w-full bg-purple-500 rounded' onClick={handleLogin}>Login</button>
                    </div>
                    
                    <div>
                        <p>Don't have an account? <span onClick={()=> navigate('/signup')} className='text-purple-50 cursor-pointer'>Create an account</span> </p>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}