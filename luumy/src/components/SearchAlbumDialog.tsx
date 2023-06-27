import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../App';
import { AlbumContext } from '../pages/UserList';
import { useNavigate } from 'react-router-dom';

interface AlbumDialog
{
    open: boolean;
    closeDialog: () => void;
    name: string;
    image: string;
    artist: string;
    albumID: string;
}

export default function AlbumDialog(props: AlbumDialog){

    const [tracks, setTracks] = useState([]);
    const [favoriteTrack, setFavoriteTrack] = useState('');
    const [score, setScore] = useState(-1);
    const [notes, setNotes] = useState('');

    const userData = useContext(UserContext);
    const toggleUpdate = useContext(AlbumContext);
    const navigate = useNavigate();
    
    // Runs as soon as album card is opened, calling the spotify api
    // to get the tracks for that album
    useEffect(() => {
        async function fetchAlbumTracks()
        {
            const url = `http://localhost:8000/spotify/albumTracks/${props.albumID}`;
            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => handleGetAlbumTracks(response.data.tracks))
                .catch(error => {
                    console.log("This is the error", error);
    
                });
        }


        fetchAlbumTracks();
    }, []);

    // Handles getting the tracks of the album and puts them in the dropdown list
    const handleGetAlbumTracks = (tracks:any) => {
        const trackNames:any = [];

        trackNames.push(<option key={0} value='0'></option>)
        
        tracks.items.forEach((track:any, index:number) => {
            trackNames.push(
                <option key={index+1} value={track.name}>{track.name}</option>
            )
        })

        setTracks((tracks) => [].concat(trackNames));
        // console.log(tracks);
    }

    const handleSaveAlbum = async () => {
        const saveAlbum = {
            spotifyID: props.albumID,
            favoriteTrack: favoriteTrack ? favoriteTrack : undefined,
            score: score > -1 ? score : undefined,
            notes: notes ? notes : undefined,
        };

        const url = 'http://localhost:8000/album/add';

        await axios.post(url, saveAlbum, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                props.closeDialog();
                
                // Maybe have a checker here to see what page you are on to prevent unnecessary recalls to the api?
                toggleUpdate();
            })
            .catch((error) => {
                console.log("I AM THE ERROR HAHAHA", error);
                // Maybe change this
                navigate("/");
            });

       
    }

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

                        <button onClick={ handleSaveAlbum }
                            className='bg-violet-500 text-white text-lg rounded px-5 py-0.5'
                        >
                            Save
                        </button>
                        
                    </div>
                    

                    <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-6'>
                        <div>
                            <label htmlFor="favoriteTrack">Favorite Track</label>
                            {/* <input type="text" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' id='favoriteTrack'/> */}
                            <select name="favoriteTrack" id="favoriteTrack" className='bg-slate-600 w-full rounded-sm text-neutral-100 focus:outline-none p-1'
                            onChange={(e) => {setFavoriteTrack(e.target.value)}}>
                                {tracks}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="score">Score</label>
                            <input type="number" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' id='score' min={0} max={10}
                            onChange={(e) => {setScore(e.target.valueAsNumber)}}/>
                        </div>
                        
                        <div className='col-span-2'>
                            <label htmlFor="notes">Notes</label>
                            {/* <input type="text" className='bg-slate-500 w-full rounded-sm resize-y' id='notes'/> */}
                            <textarea id="notes" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' 
                            onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                        
                
                    </div>
                
                    
                </DialogContent>
                
            </Dialog>
        </div>
        
    );
}