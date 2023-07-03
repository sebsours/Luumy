// import { useState, useCallback } from 'react';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

interface AuthProps
{
    handleUserData: (userData:Object) => void;
}

export default function Auth(props: AuthProps){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const userData = useContext(UserContext);

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
                    props.handleUserData(response.data);
                    navigate(`/user/${response.data.userInfo.username}`);
                })
                .catch((error):any => {
                    console.log(error);
                })
            
        }
    }
    
    async function checkUser()
    {
        const url = 'http://localhost:8000/login/getCurrentUser';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                navigate(`/user/${res.data.username}`);
            }).catch(reason => {
                console.log(reason);
            })
    }


    useEffect(() => {
        checkUser();
    }, [])

    return (
        <div className="h-screen bg-background flex justify-center items-center text-text">
            <div className='pr-48'>
                <span className='text-9xl'>
                    <NightsStayIcon fontSize='inherit'/>
                    <span className='text-7xl font-extralight'>Luumy</span>
                </span>
                
                <p className='text-lg font-extralight mt-5'>Keep track of all the albums you listened to and love
                    </p>
                <p className='text-sm font-light text-right mt-1'>Uses Spotify's WebAPI</p>
            </div>

            <div className="bg-accent rounded-sm w-1/5">
                
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
                        <button className='w-full bg-primary-button rounded' onClick={handleLogin}>Login</button>
                    </div>
                    
                    <div>
                        <p>Don't have an account? <span onClick={()=> navigate('/signup')} className='cursor-pointer'>Create an account</span> </p>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}