import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Menu, MenuItem } from '@mui/material';

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
        setOpenMenu(false);
        const url = 'http://localhost:8000/login/logout';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                console.log("Logout successful!");
                navigate('/')
            }).catch(reason => {
                console.log(reason);
            })
    }

    const handleNavigation = () => { navigate('/')}

    return(
        // <div className="w-full bg-background p-4 flex justify-around items-center text-text font-sans">
        //     <div>
        //         <span>Luumy</span>
        //     </div>
        //     {/* border border-[]  */}
        //     <button className='w-1/3 flex justify-between rounded border border-primary-button p-1' onClick={props.openModal}>
        //         <span>Albums, Artists</span>
        //         <SearchIcon />
        //     </button>

        //     {username ? <div className='group relative'>
        //                     <button className=''><Avatar>{username.slice(0,1).toUpperCase()}</Avatar></button>
        //                     <div className='absolute bg-[] top-[40px] -right-[42px] px-5 py-3 rounded-b-lg invisible group-hover:visible'>
        //                         <div className='text-center pt-3.5'>
                                    
        //                             <button className='hover:text-gray-500 inline-flex' onClick={handleLogout}><LogoutIcon/><span className='pl-2'>Logout</span></button>
        //                         </div>
        //                     </div>
        //                 </div>
        //     : <div> <button onClick={handleNavigation}><span>Log In / Sign Up</span></button></div>
        //     }
        // </div>
        <div className='w-full bg-background text-text flex justify-around items-center p-3'>
            <div className='hidden sm:block'>
                <span className='font-semibold text-lg'>Luumy</span>
            </div>
            <button className='w-4/6 lg:w-1/3 flex justify-between rounded border border-primary-button p-1' onClick={props.openModal}>
                <span>Find Albums</span>
                <SearchIcon/>
            </button>
            { username ? <div className='relative'>
                            
                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-text " type="button" onClick={() => setOpenMenu((prev) => !prev)}>
                                   <Avatar className='bg-gradient-to-b from-primary-button to-primary-button'>
                                        {username.slice(0,1).toUpperCase()}
                                    </Avatar> 
                            </button>
                            {openMenu && (
                                <div className='bg-primary-button absolute top-12 -right-7 rounded-lg w-[100px] py-3'>                
                                    <button className='w-[100px]' onClick={handleLogout}><LogoutIcon/> Logout</button>
                                </div>
                            )}
                            

                            
                        </div>
            : <div><button onClick={handleNavigation}><span>Log In / Sign Up</span></button></div> }
        </div>
    );
    
}