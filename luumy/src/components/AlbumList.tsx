import AlbumCard from "./AlbumCard"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from '../App';

export default function AlbumList()
{
    const token = useContext(TokenContext);
    const [userAlbums, setUserAlbums] = useState([]);

    useEffect(() => {
        
        async function fetchUserAlbums()
        {
            const url = 'http://localhost:8000/album/getAlbums';
            await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => handleUserAlbums(response.data))
                .catch(error => console.log(error));
        }


        fetchUserAlbums();
    }, []);

    const handleUserAlbums = (albums:any) => {
        console.log(albums);
        const albumComponents:any = [];
        
        albums.forEach((album:any, index:number) => {
            albumComponents.push(
                <div key={index}>
                    <AlbumCard 
                        favoriteTrack={`${album.favoriteTrack}`} score={album.score} notes={`${album.notes}`}
                        image={`${album.image}`} name={`${album.name}`} artistName={`${album.artistName}`}
                    />
                </div>
                
            )
        });
        console.log(albumComponents)
        setUserAlbums((userAlbums) => [].concat(albumComponents));
        
    }

    return(
        <div className="grid grid-cols-4 gap-4">
            { userAlbums }
        </div>
    )
}