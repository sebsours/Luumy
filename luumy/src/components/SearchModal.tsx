import SearchIcon from '@mui/icons-material/Search';
import SearchCard from './searchCard';
import { useState } from 'react';
import axios from 'axios';

export default function SearchModal(){
    const [search, setSearch] = useState('');
    const [searchCards, setCards] = useState([]);

    // need a useEffect to rerender the search results

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
        // What i need:
            // album_type (to show only albums)
            // href (to make it easier to access that specific album's endpoint)
            // images (need to check the size for it to be consistent)
            //     - gives an array of images with: url of Image, height, and width in pixels
            // name (name of album)
            // artist
            //     - gives an array of objects: need the name of artist from here
            //      - the artist also gives an href/spotify_id of artist and you can extract genre from there
            
            // maybe need:
            // release date
        album = album.albums;
        // console.log(album);

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] pt-20 px-40">
            <div className='flex justify-center'>
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
            </div>
            
            <div className="grid grid-cols-4 gap-4">
                {searchCards}
            </div>
        </div>
    )
}