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

    // may need a useEffect to rerender the search results

    const handleSearch = async () => {
        if (search)
        {
            // change for later

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
                        release_date={`${item.release_date}`}/>
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
            <Dialog open={props.isVisible} onClose={props.closeModal} fullWidth={true} maxWidth={'lg'} >
                <DialogContent className='bg-purple-900'>
                    <div className='flex justify-center' >
                        <div className='w-1/2 mb-4 border border-purple-500 rounded-md'>

                            <input type="text" placeholder='Albums, Artists'
                                className='w-11/12 pl-2 py-2.5 bg-transparent focus:outline-none '
                                onChange={(e) => {setSearch(e.target.value)}}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter'){
                                        handleSearch();
                                    }
                                }}/>

                            <button className='w-1/12' onClick={handleSearch}><SearchIcon className='text-purple-500'/></button>
                        </div>
                        {/* <button className='pl-5 pb-5 text-4xl'>X</button> */}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-12 mt-6">
                        {searchCards}
                    </div>
                </DialogContent>
                
            </Dialog>
            
        </div>
    )
}