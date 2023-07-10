import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogContent } from '@mui/material';
import SearchCard from './SearchCard';
import { useState } from 'react';
import axios from 'axios';

interface SearchModalProps
{
    isVisible: boolean;
    closeModal: () => void;
}

export default function SearchModal(props:SearchModalProps){
    const [search, setSearch] = useState('');
    const [searchCards, setCards] = useState([]);

    const handleSearch = async () => {
        if (search)
        {
            const url = `http://localhost:8000/spotify/search/${search}`;
            await axios.get(url, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
                .then((response:any) => { handleGetAlbumInfo(response.data) })
                .catch((error:any) => { console.log(error) });
        }
        
    }

    const handleGetAlbumInfo = (album: any) => {
        // setCards(searchCards => []);
        album = album.albums;
        const searchResults:any = [];
        
        album.items.forEach((item:any, index:number) => {
            if (item.album_type === "album")
            {
                searchResults.push(
                    <div key={index}>
                        <SearchCard 
                            albumID={`${item.id}`} 
                            images={item.images} 
                            name={`${item.name}`} 
                            artists={item.artists} 
                            release_date={`${item.release_date}`}
                            />
                    </div>
                    
                )
            }
        })
        
        setCards((searchCards) => [].concat(searchResults));
        
        
    }

    const handleClose = (e:any) => { 
        if (e.target.id === 'close') props.closeModal()}

    if (!props.isVisible) return null;

    return (
        <div>
            <Dialog open={props.isVisible} onClose={props.closeModal} fullWidth={true} maxWidth={'lg'} sx={{backdropFilter: "blur(5px)",}} >
                <DialogContent className='bg-background text-text scrollbar-thin scrollbar-thumb-accent'>
                    <div className='flex justify-center w-full'>
                        <div className='w-full lg:w-2/3 flex justify-between rounded border border-primary-button p-1'>
                            <input type="text" placeholder='Albums, Artists'
                                className='w-11/12 p-1.5 bg-transparent focus:outline-none'
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter'){
                                        handleSearch();
                                    }
                                }}
                            />
                            <button className='w-1/12 pr-6 sm:pr-0'><SearchIcon /></button>
                        </div>
                    </div>

                    <div className='flex justify-evenly'>
                        <div className='grid grid-cols-1 gap-y-6 gap-x-10 mt-6 min-[430px]:grid-cols-2 sm:grid-cols-3 min-[860px]:grid-cols-4'>
                            {searchCards}
                        </div>
                    </div>
                    
                </DialogContent>
                
            </Dialog>
            
        </div>
    )
}