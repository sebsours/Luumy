import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Menu, MenuItem } from '@mui/material';

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface NavbarProps
{
    openModal: () => void;
}

export default function Navbar(props:NavbarProps)
{
    const [username, setUsername] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    

    const navigate = useNavigate();

    async function fetchUserData()
    {
        const url = 'http://localhost:8000/user/getCurrentUser';
        
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
        setOpenMenu(false);
        const url = 'http://localhost:8000/login/logout';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                navigate('/')
            }).catch(reason => {
                console.log(reason);
            })
    }

    const handleNavigation = () => { navigate('/')}

    return(
        <div className='w-full bg-background text-text flex justify-around items-center p-3'>
            <div className='hidden sm:block'>
                <span className='font-semibold text-lg'>Luumy</span>
            </div>
            <button className='w-4/6 lg:w-1/3 flex justify-between rounded border border-primary-button p-1 focus:outline-none' onClick={props.openModal}>
                <span>Find Albums</span>
                <SearchIcon/>
            </button>
            { username ? <div className='relative'>
                            
                            <button className="text-text " type="button" onClick={() => setOpenMenu((prev) => !prev)}>
                                   <Avatar className='bg-gradient-to-b from-primary-button to-primary-button'>
                                        {username.slice(0,1).toUpperCase()}
                                    </Avatar> 
                            </button>
                            {openMenu && (
                                <div className='bg-primary-button absolute top-12 -right-7 rounded-lg w-[100px] py-3 hover:bg-violet-800 transition ease-in-out'>                
                                    <button className='w-[100px] ' onClick={handleLogout}><LogoutIcon/> Logout</button>
                                </div>
                            )}
                            

                            
                        </div>
            : <div><button onClick={handleNavigation}><span>Log In / Sign Up</span></button></div> }
        </div>
    );
    
}