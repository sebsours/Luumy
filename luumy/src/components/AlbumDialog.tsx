import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, TextField } from '@mui/material';

interface AlbumDialog
{
    open: boolean;
    closeDialog: () => void;
    name: string;
    image: string;
    artist: string;
}



export default function AlbumDialog(props: AlbumDialog){
    
    // useEffect(() => {

    //     console.log('I fire once');
    // }, []);

    return (
        <div>
            <Dialog open={props.open} onClose={props.closeDialog}>
                <DialogContent className='bg-violet-300'>
                    <div className='flex items-end'>
                        <img src={props.image} alt="" className='w-1/4'/>

                        <div className='ml-3 w-3/4'>
                            <p className='text-2xl mb-1.5'>{props.name}</p>

                            <p className='text-xl'>{props.artist}</p>
                        
                        </div>

                        <button onClick={props.closeDialog }
                            className='bg-violet-500 text-white text-lg rounded px-5 py-0.5'
                        >
                            Save
                        </button>
                        
                    </div>
                    

                    <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-6'>
                        <div>
                            <label htmlFor="favoriteTrack">Favorite Track</label>
                            {/* <input type="text" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' id='favoriteTrack'/> */}
                            <select name="favoriteTrack" id="favoriteTrack" className='bg-slate-600 w-full rounded-sm text-neutral-100 focus:outline-none p-1'>
                                <option value="test1">Test1</option>
                                <option value="test2">Test2</option>
                                <option value="test3">Test3</option>
                                <option value="test4">Test4</option>
                                <option value="test5">Test5</option>
                                <option value="test6">Test6</option>
                                <option value="test7">Test7</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="score">Score</label>
                            <input type="number" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' id='score'/>
                        </div>
                        
                        <div className='col-span-2'>
                            <label htmlFor="notes">Notes</label>
                            {/* <input type="text" className='bg-slate-500 w-full rounded-sm resize-y' id='notes'/> */}
                            <textarea id="notes" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none'></textarea>
                        </div>
                        
                
                    </div>
                
                    
                </DialogContent>
                
            </Dialog>
        </div>
        
    );
}