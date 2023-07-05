import Navbar from '../components/Navbar';
import AlbumList from '../components/AlbumList';
import AlbumCard from '../components/AlbumCard';
import SearchModal from '../components/SearchModal';
import { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

interface albumObj
{
    
    favoriteTrack?:string,
    score?:string,
    notes?:string,
    spotifyID:string,
    image:Image[],
    name:string,
    artistName:string
}
interface Image
{
    url: string;
    height: number;
    width: number;
}

export const AlbumContext = createContext<any>(null);

export default function UserList()
{   
    const [modalOpen, setModalOpen] = useState(false);
    // const [validUser, setValidUser] = useState(false);
    const [userAlbums, setUserAlbums] = useState([]);
    const [userAlbumsDivs, setUserAlbumsDivs] = useState([]);
    const [updateAlbumList, setUpdateAlbumList] = useState('toggle');
    const [sortCriteria, setSortCriteria] = useState('Score');
    const [filterQuery, setFilterQuery] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const toggleUpdate = () => {
        setUpdateAlbumList(updateAlbumList => (updateAlbumList === 'toggle' ? 'retoggle' : 'toggle'));
    }   
    
    // const { data: currentUser, isLoading } = useCurrentUser();

    // Runs on initial render or when user adds an album to their list
    // It also runs when a user adds an album to their list but are on a different page
    // i.e. recalls the api when it shouldnt have to
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
            .then(response => {
                setUserAlbums(response.data);
                handleUserAlbums(response.data)
            })
            .catch(error => console.log(error));
    }

    async function checkValidUser()
    {
        console.log("yo")
        const url = 'http://localhost:8000/user/findUser';

        await axios.post(url, { username: params.username})
            .then(response => {
                fetchUserAlbums();
            })
            .catch(error => {
                navigate("/404");
            })
    }


    useEffect(() => {
        checkValidUser();

    }, [updateAlbumList]);

    // When a user changes the sorting option, this useEffect will run
    useEffect(() => {
        handleUserAlbums(userAlbums);
    }, [sortCriteria, filterQuery])

    function filterItems(arr:albumObj[], query:string) {
        if (!query) return arr;
        return arr.filter((el:albumObj) => el.name.toLowerCase().includes(query.toLowerCase()) || el.artistName.toLowerCase().includes(query.toLowerCase()));
        
    }

    const handleUserAlbums = (albums:albumObj[]) => {
        if (sortCriteria === 'Score') {
            albums.sort((a:albumObj, b:albumObj) => {
                let num1 = parseFloat(a.score ? a.score : '0');
                let num2 = parseFloat(b.score ? b.score : '0');

                return num2 - num1;
            });

        } else if (sortCriteria === 'Title') {
            albums.sort((a:albumObj, b:albumObj) => {
                let title1 = a.name.toUpperCase();
                let title2 = b.name.toUpperCase();

                if (title1 < title2) { return -1; }
                else if (title1 > title2) { return 1; }
                else { return 0; }
                
            });
        } else {
            albums.sort((a:albumObj, b:albumObj) => {
                let artist1 = a.artistName.toUpperCase();
                let artist2 = b.artistName.toUpperCase();

                if (artist1 < artist2) { return -1; }
                else if (artist1 > artist2) { return 1; }
                else { return 0; }
                
            });
        }

        const filteredAlbums = filterItems(albums, filterQuery);

        const albumComponents:any = [];
        
        filteredAlbums.forEach((album:any, index:number) => {
            albumComponents.push(
                <div key={index}>
                    <AlbumCard 
                        favoriteTrack={album.favoriteTrack ? `${album.favoriteTrack}` : null} 
                        score={album.score ? album.score : null} 
                        notes={album.notes ? `${album.notes}` : null}
                        spotifyID={album.spotifyID}
                        image={album.image}
                        name={`${album.name}`} 
                        artistName={`${album.artistName}`}
                    />
                </div>
                
                
            )
        });

        setUserAlbumsDivs((userAlbumsDivs) => [].concat(albumComponents));
        
    }

    return (
        <AlbumContext.Provider value={toggleUpdate} >
            <div className='h-full bg-background'>
                
                <Navbar openModal={() => setModalOpen(true)}/>
                <div className=' bg-background'>
                    <div>
                        <ul className='py-10 pl-32 flex items-end gap-12'>
                            <li className='flex items-end'>
                                <div className='bg-slate-400 h-48 w-36 flex justify-center items-center'>
                                    <span className='text-7xl'>{params.username?.slice(0,1).toUpperCase()}</span>
                                </div>
                                <span className='pl-3.5 text-lg text-text'>{params.username}</span>
                            </li>
                            <li>
                                <input type="text" placeholder='Filter' onChange={(e) => {setFilterQuery(e.target.value)}}
                                />

                            </li>
                            <li>
                                <select name="sort" id="sort" onChange={(e) => {setSortCriteria(e.target.value)}}>
                                    <option value="Score">Score</option>
                                    <option value="Title">Title</option>
                                    <option value="Artist">Artist</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    
                    

                    
                    <div className='px-10 lg:px-32 pb-10'>
                        <AlbumList UserAlbumList={userAlbumsDivs}/>
                    </div>
                    
                </div>
                
                    <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
                
                
            </div>
        </AlbumContext.Provider>
        
    )
}