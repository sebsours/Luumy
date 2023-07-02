import NotesIcon from '@mui/icons-material/Notes';
import SettingsIcon from '@mui/icons-material/Settings';
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
    image:string;
    name:string;
    artistName:string;
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
        <div className="flex h-full bg-zinc-600 rounded-md group">
            <div className="w-1/2">
                <img className='' src={props.image} alt="albumCover" />
            </div>
            <div className="w-1/2 grid text-white pl-2">
                <div className='grid content-start'>
                    <span className='text-lg font-bold py-3'>{props.name}</span>
                    <span className='text-sm pb-3'>{props.artistName}</span>
                    <span className='text-sm'>{props.favoriteTrack}</span>
                </div>

                <div>
                    <button className='invisible group-hover:visible'><SettingsIcon/></button>
                    <div>
                        <button className='bg-slate-300 mr-3 text-black' onClick={() => setOpen(true)}>Edit</button>
                        <button className='bg-slate-300 mr-3 text-black' onClick={handleDelete}>Delete</button>
                    </div>
                </div>

                <div className='flex justify-between'>  
                {props.notes ? 
                    <Tooltip title={props.notes} placement='right-end'>
                        <NotesIcon className='hover:bg-slate-400 transition rounded'/>
                    </Tooltip>: <div></div>
                }
                    <span className='self-center pr-4 text-xl font-semibold'>{props.score}</span>
                </div>
            </div>

            {open ? <AlbumDialog open={open} 
                                closeDialog={() => setOpen(false)} 
                                name={props.name} 
                                image={props.image} 
                                artist={props.artistName}
                                albumID={props.spotifyID} 
                                favoriteTrack={props.favoriteTrack} 
                                score={props.score} 
                                notes={props.notes}
                                edit={true}/>
            : null}
        </div>
    );
}