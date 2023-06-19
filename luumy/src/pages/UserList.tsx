import Navbar from '../components/Navbar';
import AlbumList from '../components/AlbumList';
import AlbumCard from '../components/AlbumCard';
import SearchModal from '../components/SearchModal';
import { useState, useEffect, createContext, useContext } from 'react';
import { TokenContext } from '../App';
import axios from 'axios';
import { Avatar } from '@mui/material';
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
                <div>
                    <ul className='py-10 pl-32 flex items-end gap-12'>
                        <li className='flex items-end'>
                            {/* <Avatar sx={{ width: 70, height:70}}>{params.username?.slice(0,1).toUpperCase()}</Avatar> */}
                            <div className='bg-slate-400 h-48 w-36 flex justify-center items-center'>
                                <span className='text-7xl'>{params.username?.slice(0,1).toUpperCase()}</span>
                            </div>
                            <span className='pl-3.5 text-lg'>{params.username}</span>
                        </li>
                        <li>
                            <input type="text" placeholder='Filter'/>
                        </li>
                        <li>
                            <select name="sort" id="sort">
                                <option value="Score">Score</option>
                                <option value="Title">Title</option>
                                <option value="Artist">Artist</option>
                            </select>
                        </li>
                    </ul>
                </div>
                
                

                
                <div className='px-32'>
                    <AlbumList UserAlbumList={userAlbums}/>
                </div>
                
            </div>
            <AlbumContext.Provider value={toggleUpdate} >
                <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
            </AlbumContext.Provider>
            
        </div>
        
    )
}