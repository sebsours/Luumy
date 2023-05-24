import { useState, useCallback } from 'react';
import NightsStayIcon from '@mui/icons-material/NightsStay';

export default function Auth(){


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
                            className="w-full rounded-sm p-1 focus:outline-none"/>
                    </div>

                    <div className="flex flex-col mb-3 gap-1 ">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" autoComplete="none"
                            className="w-full rounded-sm p-1 focus:outline-none"/>
                    </div>

                    <div className='w-full mb-3'>
                        <button className='w-full bg-purple-500 rounded'>Login</button>
                    </div>
                    
                    <div>
                        <p>Don't have an account? <span onClick={()=> console.log('hello')} className='text-neutral-100 cursor-pointer'>Create an account</span> </p>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}