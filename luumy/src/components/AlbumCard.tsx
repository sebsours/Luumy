import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Tooltip, ClickAwayListener } from '@mui/material';
import AlbumDialog from './SearchAlbumDialog';
import { AlbumContext, SessionExpiredContext } from '../pages/UserList';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const [openModal, setOpenModal] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [sameUserAsURL, setSameUserAsURL] = useState(false);

   
    const toggleUpdate = useContext(AlbumContext);
    const {toggleSessionExpired} = useContext(SessionExpiredContext);
    const params = useParams();

    async function fetchUserData()
    {
        const url = 'http://localhost:8000/user/getCurrentUser';
        await axios.get(url, {withCredentials: true})
            .then(res => {
                setSameUserAsURL(params.username === res.data.username);
            }).catch(reason => {})
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const handleDelete = async () => {
        const url = 'http://localhost:8000/album/deleteAlbum';
        await axios.delete(url, {
           data: {spotifyID: props.spotifyID},
           withCredentials: true
        })
            .then((res) => {
                setOpenOptions(false);
                toggleUpdate();
            })
            .catch((error) => {
                console.log(error);
                toggleSessionExpired(true);
            });
    }

    return (

        <div className='h-[325px] w-[175px] lg:h-[210px] lg:w-[425px] 2xl:w-[425px] bg-accent rounded-md group'>
            <div className='flex flex-col lg:flex-row items-center h-full pt-3 lg:pt-0 lg:px-4'>
                <div className='w-5/6 lg:w-2/5'>
                    <img src={props.image[1].url} alt="albumCover"/>
                </div>

                <div className='h-2/3 w-full lg:w-3/5 lg:h-full text-text px-4 lg:pl-4 lg:pr-0.5 pt-3 lg:py-5'>
                    <div className='h-full flex flex-col relative gap-1.5'>
                        <div className='flex relative'>
                            <span className='font-bold text-sm lg:text-lg flex-1'>{props.name}</span>
                            {sameUserAsURL && (
                                <button className='invisible group-hover:visible -mt-1' onClick={() => setOpenOptions((prev) => !prev)}>
                                    <MoreHorizIcon />
                                </button>    
                            )}

                            {openOptions && (
                                <ClickAwayListener onClickAway={() => setOpenOptions(false)}>
                                    <ul className='bg-primary-button absolute rounded-md flex flex-col items-center top-6 right-0 w-20 p-2 '>
                                        <li className='w-full mb-2'>
                                            <button className='w-full rounded-md hover:bg-violet-800 transition ease-in-out' onClick={() => setOpenModal(true)}>Edit</button>
                                        </li>
                                        <li className='w-full'>
                                            <button className='w-full rounded-md hover:bg-violet-800 transition ease-in-out' onClick={handleDelete}>Delete</button>
                                        </li>
                                    </ul>   
                                </ClickAwayListener>
                                 
                            )}
                            
                        </div>
                        
                        <span className='font-semibold text-xs'>{props.artistName}</span>
                        <span className='font-medium text-xs'>{props.favoriteTrack}</span>

                        <div className='flex justify-between mt-auto pb-1.5 lg:pb-1'>
                            { props.notes ? 
                                <Tooltip title={props.notes} placement='right'>
                                    <CommentIcon className='mt-auto' fontSize='small'/>
                                </Tooltip> : <div className='invisble'></div> 
                            }
                            <span className='font-semibold text-lg tracking-tight lg:text-xl'>{props.score}</span>
                        </div>

                        
                    </div>

                   
                </div>
            </div>
            {openModal ? <AlbumDialog open={openModal} 
                                closeDialog={() => setOpenModal(false)} 
                                name={props.name} 
                                image={props.image[1].url} 
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