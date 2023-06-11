import Navbar from '../components/Navbar';
import AlbumList from '../components/AlbumList';
import AlbumCard from '../components/AlbumCard';
import SearchModal from '../components/SearchModal';
import { useState, useEffect, createContext, useContext } from 'react';
import { TokenContext } from '../App';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const AlbumContext = createContext<any>(null);

export default function UserList()
{   
    const [updateAlbumList, setUpdateAlbumList] = useState('toggle');
    const params = useParams();

    const toggleUpdate = () => {
        setUpdateAlbumList(updateAlbumList => (updateAlbumList === 'toggle' ? 'retoggle' : 'toggle'));
    }

    const [modalOpen, setModalOpen] = useState(false);

    const token = useContext(TokenContext);
    const [userAlbums, setUserAlbums] = useState([]);

    useEffect(() => {
        console.log(params);
        async function fetchUserAlbums()
        {
            const url = 'http://localhost:8000/album/getAlbums';
            await axios.post(url, {username: params.username} , {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    username: params.username
                }
            })
                .then(response => handleUserAlbums(response.data))
                .catch(error => console.log(error));
        }


        fetchUserAlbums();
    }, [updateAlbumList]);

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

    return (
        <div className=''>
            <Navbar openModal={() => setModalOpen(true)}/>
            <div className='h-screen bg-purple-200'>
                <AlbumList UserAlbumList={userAlbums}/>
            </div>
            <AlbumContext.Provider value={toggleUpdate} >
                <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
            </AlbumContext.Provider>
            
        </div>
        
    )
}