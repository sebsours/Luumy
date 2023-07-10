import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import axios from 'axios';
import { AlbumContext, SessionExpiredContext } from '../pages/UserList';

interface AlbumDialogProps
{
    open: boolean;
    closeDialog: () => void;
    name: string;
    image: string;
    artist: string;
    albumID: string;

    favoriteTrack?:string | null;
    score?:number | null;
    notes?:string | null;
    edit?:boolean;
}

export default function AlbumDialog(props: AlbumDialogProps){

    const [tracks, setTracks] = useState([]);
    const [favoriteTrack, setFavoriteTrack] = useState(props.favoriteTrack ? props.favoriteTrack : '');
    const [score, setScore] = useState(props.score ? props.score : -1);
    const [notes, setNotes] = useState(props.notes ? props.notes : '');
    // const [edit, setEdit] = useState(props.edit ? props.edit : false);
    const edit = props.edit ? props.edit : false;

    const {toggleUpdate, closeSearchModal} = useContext(AlbumContext);
    const {toggleSessionExpired} = useContext(SessionExpiredContext);
    
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
                    console.log(error);
                });
        }


        fetchAlbumTracks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handles getting the tracks of the album and puts them in the dropdown list
    const handleGetAlbumTracks = (tracks:any) => {
        const trackNames:any = [];

        trackNames.push(<option key={0} value=''></option>)
        
        tracks.items.forEach((track:any, index:number) => {
            trackNames.push(
                <option key={index+1} value={track.name}>{track.name}</option>
            )
        })

        setTracks((tracks) => [].concat(trackNames));
    }

    const handleSaveAlbum = async () => {
        const saveAlbum = {
            spotifyID: props.albumID,
            favoriteTrack: favoriteTrack ? favoriteTrack : null,
            score: score > -1 ? score : null,
            notes: notes ? notes : null,
        };

        if (edit)
        {
            const url = 'http://localhost:8000/album/editAlbum';
            
            await axios.put(url, saveAlbum, {withCredentials: true})
                .then((response) => {   
                    props.closeDialog();
                    toggleUpdate();
                })
                .catch((error) => {
                    props.closeDialog();
                    toggleSessionExpired(true);
                })

        } else {
            const url = 'http://localhost:8000/album/add';
            await axios.post(url, saveAlbum, {withCredentials: true})
            .then((response) => {
                props.closeDialog();
                // Maybe have a checker here to see what page you are on to prevent unnecessary recalls to the api?
                closeSearchModal();
                toggleUpdate();
            })
            .catch((error) => {
                props.closeDialog();
                closeSearchModal();
                toggleSessionExpired(true);
            });
        }
       
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.closeDialog} sx={{backdropFilter: 'blur(5px)',}}> 
                <DialogContent className=' bg-background  text-text'>
                    <div className='flex flex-col sm:flex-row sm:items-end'>
                        <div className='sm:w-2/5'>
                            <img src={props.image} alt=""/>
                        </div>
                        

                        <div className='my-2 sm:ml-3 sm:mb-0'>
                            <p className='font-semibold text-lg sm:text-xl'>{props.name}</p>

                            <p className='font-semibold text-sm sm:text-md tracking-wide'>{props.artist}</p>
                        
                        </div>

                        <button onClick={ handleSaveAlbum }
                            className='bg-primary-button text-white font-medium rounded px-5 py-0.5 hover:bg-violet-800 transition ease-in-out
                            sm:ml-auto'
                        >
                            Save
                        </button>
                        
                    </div>
                    

                    <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-6'>
                        <div>
                            <label htmlFor="favoriteTrack" className='font-semibold'>Favorite Track</label>
                            {/* To have a preselected option, you have to use value attribute and set that equal to the favorite song */}
                            <select name="favoriteTrack" id="favoriteTrack" value={favoriteTrack ? favoriteTrack : ''} 
                            className='bg-slate-600 w-full rounded-sm text-neutral-100 focus:outline-none p-1'
                            onChange={(e) => {setFavoriteTrack(e.target.value)}}>
                                {tracks}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="score" className='font-semibold'>Score</label>
                            <input type="number" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' id='score' autoComplete='off' min={0} max={10}
                            value={score !== -1 ? score : ''}
                            onChange={(e) => {setScore(e.target.valueAsNumber ? e.target.valueAsNumber : 0)}}
                            onBlur={(e) => {
                                e.target.value = String(e.target.valueAsNumber * 1);
                                if (e.target.value.match(/^(?:10|\d(?:\.\d+)?)$/)) {
                                    if (e.target.valueAsNumber % 1 !== 0){ 
                                        e.target.value = parseFloat(e.target.value).toFixed(1);
                                    }
                                    setScore(e.target.valueAsNumber);
                                } else {
                                    if (e.target.valueAsNumber < 0) {
                                        e.target.value = '';
                                        setScore(0);
                                    }
                                    else if (e.target.valueAsNumber > 10) {
                                        e.target.value = '10';
                                        setScore(10);
                                    }
                                }
                            }}/>
                        </div>
                        
                        <div className='col-span-2'>
                            <label htmlFor="notes" className='font-semibold'>Notes</label>
                            {/* <input type="text" className='bg-slate-500 w-full rounded-sm resize-y' id='notes'/> */}
                            <textarea id="notes" className='bg-slate-600 w-full rounded-sm text-neutral-100 p-1 focus:outline-none' 
                            value={notes ? notes : ''}
                            onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                        
                
                    </div>
                
                    
                </DialogContent>
                
            </Dialog>
        </div>
        
    );
}