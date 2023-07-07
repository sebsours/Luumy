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
        <div className='h-screen w-full bg-background text-text flex flex-col justify-center items-center md:flex-row'>
            <div className='text-center w-80 md:w-96 md:text-left pr-5 lg:w-4/12'>
                <div className='font-semibold text-5xl flex justify-center items-center mb-4 md:justify-start md:text-6xl'>
                    <NightsStayIcon fontSize='inherit' className='pt-2'/>
                    <span>Luumy</span>
                </div>
                
                <p className='font-medium tracking-wide mb-1'>Keep track of all the albums you've listened to and love</p>
                <p className='font-medium'>Using the Spotify Web API</p>
            </div>

            <div className='bg-accent rounded-lg mt-7 w-80 md:w-96'>
                <div className='mb-3 pl-4 pt-3'>
                    <span className='font-semibold text-2xl'>Login</span>
                </div>
                
                <div className='flex flex-col mb-3 w-full items-start px-4 gap-1'>
                    <label htmlFor="username" className='font-medium'>Username</label>
                    <input id='username' type="text" placeholder='Username' autoComplete='none' onChange={(e) => setUsername(e.target.value)}
                    className='w-full text-accent rounded-sm p-1 focus:outline-none'/>
                </div>

                <div className='flex flex-col mb-3 w-full items-start px-4 gap-1'>
                    <label htmlFor="password" className='font-medium'>Password</label>
                    <input id='password' type="password" placeholder='Password' autoComplete='none' onChange={(e) => setPassword(e.target.value)}
                    className='w-full text-accent rounded-sm p-1 focus:outline-none'/>
                </div>

                <div className='flex justify-center pt-1'>
                    <button className='w-full mx-4 bg-primary-button rounded hover:bg-violet-800 transition ease-in-out font-semibold py-0.5'
                    onClick={handleLogin}>Login</button>
                </div>

                <div className='mx-4 my-3 font-medium text-md'>
                    <p className='-mb-1'>Don't have an account? </p>
                    <span onClick={()=> navigate('/signup')} className='cursor-pointer text-sm text-gray-400'>Create an account</span> 
                </div>
            </div>
        </div>
    )
}