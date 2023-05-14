import SearchIcon from '@mui/icons-material/Search';
import SearchCard from './searchCard';
import { useState } from 'react';
import axios from 'axios';
import { isVisible } from '@testing-library/user-event/dist/utils';

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

    const handleGetAlbumInfo = async (album: any) => {
        
        album = album.albums;
        const searchResults:any = [];
        
        album.items.forEach((item:any, index:number) => {
            if (item.album_type === "album")
            {
                searchResults.push(
                    <div key={index}>
                        <SearchCard 
                        href={`${item.href}`} 
                        images={item.images} 
                        name={`${item.name}`} 
                        artists={item.artists} 
                        release_date={`${item.release_date}`}/>
                    </div>
                    
                )
                console.log('pusheed');
            }
        })
        console.log(searchResults);
        setCards(searchCards.concat(searchResults));
        console.log(searchCards.length);
    }

    const handleClose = (e:any) => { 
        if (e.target.id === 'close') props.closeModal()}

    if (!props.isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] pt-20 px-40" id='close' onClick={handleClose}>
            <div className='flex justify-center' id='close' onClick={handleClose}>
                <div className='w-1/3 mb-4 h-full border border-gray-500 rounded-md'>

                    <input type="text" placeholder='Albums, Artists'
                        className='w-11/12 pl-2 py-2.5 bg-transparent focus:outline-none placeholder-gray-500'
                        onChange={(e) => {setSearch(e.target.value)}}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter'){
                                handleSearch();
                            }
                        }}/>

                    <button className='w-1/12' onClick={handleSearch}><SearchIcon/></button>
                </div>
                <button id='close' onClick={handleClose} className='pl-5 pb-5 text-4xl'>X</button>
            </div>
            
            <div className="grid grid-cols-4 gap-4" id='close' onClick={handleClose}>
                {searchCards}
            </div>
        </div>
    )
}