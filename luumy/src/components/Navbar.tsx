import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface NavbarProps
{
    openModal: () => void;
}

export default function Navbar(props:NavbarProps)
{
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function fetchUserData()
    {
        const url = 'http://localhost:8000/login/getCurrentUser';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                setUsername(res.data.username);
            }).catch(reason => {
                console.log(reason);
            })
    }

    useEffect(() => {
        fetchUserData();
    }, [])


    const handleLogout = async () => {
        const url = 'http://localhost:8000/login/logout';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                console.log("Logout successful!");
            }).catch(reason => {
                console.log(reason);
            })
    }

    const handleNavigation = () => { navigate('/') }

    return(
        <>
    
        <div className="w-full bg-purple-300 p-4 flex justify-around items-center">
            <div>
                <span>Luumy</span>
            </div>
            
            <button className='w-1/3 flex justify-between rounded bg-purple-300 border border-purple-200 p-1' onClick={props.openModal}>
                <span>Albums, Artists</span>
                <SearchIcon />
            </button>

            {username ? <div className='group relative'>
                            <button className=''><Avatar>{username.slice(0,1).toUpperCase()}</Avatar></button>
                            <div className='absolute bg-purple-300 top-[40px] -right-[42px] px-5 py-3 rounded-b-lg invisible group-hover:visible'>
                                <div className='text-center pt-3.5'>
                                    
                                    <button className='hover:text-gray-500 inline-flex' onClick={handleLogout}><LogoutIcon/><span className='pl-2'>Logout</span></button>
                                </div>
                            </div>
                        </div>
            : <div> <button onClick={handleNavigation}><span>Log In / Sign Up</span></button></div>
            }
        </div>
        
        </>
    );
    
}