import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Tooltip } from '@mui/material';
import AlbumDialog from './SearchAlbumDialog';
import { AlbumContext } from '../pages/UserList';
import axios from 'axios';
import { useContext, useState } from 'react';

interface AlbumCardProps
{
    favoriteTrack:string | null;
    score:number | null;
    notes:string | null;
    spotifyID: string;
    image:Image[];
    name:string;
    artistName:string;
}
interface Image
{
    url: string;
    height: number;
    width: number;
}

export default function AlbumCard(props:AlbumCardProps)
{
    const [open, setOpen] = useState(false);
    const toggleUpdate = useContext(AlbumContext);

    const handleDelete = async () => {
        const url = 'http://localhost:8000/album/deleteAlbum';
        await axios.delete(url, {
           data: {spotifyID: props.spotifyID},
           withCredentials: true
        })
            .then((res) => {
                console.log("Deleted Album");
                toggleUpdate();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        // <div className="flex h-[300px] bg-accent rounded-md group">
        //     <div className="">
        //         <img className='' src={props.image} alt="albumCover" />
        //     </div>
        //     <div className="w-1/2 grid text-text pl-2">
        //         <div className='grid content-start'>
        //             <span className='text-lg font-bold py-3'>{props.name}</span>
        //             <span className='text-sm pb-3'>{props.artistName}</span>
        //             <span className='text-sm'>{props.favoriteTrack}</span>
        //         </div>

        //         <div>
        //             <button className='invisible group-hover:visible'><SettingsIcon/></button>
        //             <div>
        //                 <button className='bg-slate-300 mr-3 text-black' onClick={() => setOpen(true)}>Edit</button>
        //                 <button className='bg-slate-300 mr-3 text-black' onClick={handleDelete}>Delete</button>
        //             </div>
        //         </div>

        //         <div className='flex justify-between'>  
        //         {props.notes ? 
        //             <Tooltip title={props.notes} placement='right-end'>
        //                 <NotesIcon className='hover:bg-slate-400 transition rounded'/>
        //             </Tooltip>: <div></div>
        //         }
        //             <span className='self-center pr-4 text-xl font-semibold'>{props.score}</span>
        //         </div>
        //     </div>

        //     {open ? <AlbumDialog open={open} 
        //                         closeDialog={() => setOpen(false)} 
        //                         name={props.name} 
        //                         image={props.image} 
        //                         artist={props.artistName}
        //                         albumID={props.spotifyID} 
        //                         favoriteTrack={props.favoriteTrack} 
        //                         score={props.score} 
        //                         notes={props.notes}
        //                         edit={true}/>
        //     : null}
        // </div>
        <div className='h-[400px] w-[700px] bg-accent rounded-md group'>
            <div className='h-full flex py-10 mx-5'>
                <div className='h-full w-1/2 grid items-center justify-center '>
                    <img src={props.image[1].url} alt="albumCover"/>
                </div>
                <div className='h-full w-1/2 text-text relative py-5'>
                    <div className='grid gap-4'>
                        <span className='font-bold text-2xl'>{props.name}</span>
                        <span className='font-semibold text-lg'>{props.artistName}</span>
                        <span className='font-medium text-xs'>{props.favoriteTrack}</span>
                    </div>
                    
                    <span className='absolute bottom-3 right-0 font-semibold text-2xl tracking-normal'>{props.score}</span>
                    <MoreHorizIcon className='absolute top-5 right-0 invisible group-hover:visible'/>
                    { props.notes ? 
                        <Tooltip title={props.notes} placement='right'>
                            <CommentIcon className='absolute bottom-5 left-0' fontSize='small'/>
                        </Tooltip> : null 
                    }

                    
                </div>
            </div>
            {/* <div>
                    <button className='bg-slate-300 mr-3 text-black' onClick={() => setOpen(true)}>Edit</button>
                        {open ? <AlbumDialog open={open} 
                                            closeDialog={() => setOpen(false)} 
                                            name={props.name} 
                                            image={props.image[0].url} 
                                            artist={props.artistName}
                                            albumID={props.spotifyID} 
                                            favoriteTrack={props.favoriteTrack} 
                                            score={props.score} 
                                            notes={props.notes}
                                            edit={true}/>
                        : null}
            </div> */}
            
            
            
        </div>
    );
}