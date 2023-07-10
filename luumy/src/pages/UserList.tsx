import Navbar from '../components/Navbar';
import AlbumList from '../components/AlbumList';
import AlbumCard from '../components/AlbumCard';
import SearchModal from '../components/SearchModal';
import SessionExpired from '../components/SessionExpired';
import { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
export const SessionExpiredContext = createContext<any>(null);

export default function UserList()
{   
    const [modalOpen, setModalOpen] = useState(false);
    // const [validUser, setValidUser] = useState(false);
    const [userAlbums, setUserAlbums] = useState([]);
    const [userAlbumsDivs, setUserAlbumsDivs] = useState([]);
    const [updateAlbumList, setUpdateAlbumList] = useState('toggle');
    const [sortCriteria, setSortCriteria] = useState('Score');
    const [filterQuery, setFilterQuery] = useState('');
    const [openSessionExpired, setOpenSessionExpired] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const toggleUpdate = () => {
        setUpdateAlbumList(updateAlbumList => (updateAlbumList === 'toggle' ? 'retoggle' : 'toggle'));
    }

    const toggleSessionExpired = (toggle:boolean) => {
        setOpenSessionExpired(toggle);
    }

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
                <SessionExpiredContext.Provider value={{openSessionExpired, toggleSessionExpired}}>

                
                    <SessionExpired open={openSessionExpired}/>
                    <Navbar openModal={() => setModalOpen(true)}/>
                
                        <div className='bg-background'>
                            <div className='text-text mt-3 mb-1 lg:mb-10 lg:flex lg:justify-center'>
                                <ul className='flex flex-col items-center gap-4 '>
                                    <li className='flex flex-col items-center'>
                                        <div className='bg-gradient-to-b from-primary-button to-background h-48 w-36 flex justify-center items-center'>
                                            <span className='font-semibold text-7xl'>{params.username?.slice(0,1).toUpperCase()}</span>
                                        </div>
                                        <span className='font-semibold text-lg'>{params.username}</span>
                                    </li>

                                    <li className='w-full flex flex-col justify-center items-center sm:flex-row lg:justify-normal lg:items-end lg:ml-5'>
                                        <div className='w-4/6 sm:w-2/5 lg:w-[280px] rounded border border-primary-button mb-3 lg:mb-0'> 
                                            <SearchIcon fontSize='small' className='ml-1'></SearchIcon>
                                            <input type="text" placeholder='Filter' onChange={(e) => {setFilterQuery(e.target.value)}} 
                                            className='bg-transparent focus:outline-none py-1 px-1.5'/>
                                        </div>

                                        <div className='sm:mx-7 pb-10 lg:pb-0.5'>
                                            <label htmlFor="sort" className='font-normal text-xs'>Sort</label>
                                            <select name="sort" id="sort" onChange={(e) => {setSortCriteria(e.target.value)}}
                                            className='bg-primary-button w-full rounded-sm text-neutral-100 focus:outline-none p-1 mt-1'>
                                                <option value="Score">Score</option>
                                                <option value="Title">Title</option>
                                                <option value="Artist">Artist</option>
                                            </select>
                                        </div>
                                        
                                        
                                    </li>
                                    
                                </ul>
                            </div>


                            <div className='flex flex-row justify-evenly pb-10'>
                                <AlbumList UserAlbumList={userAlbumsDivs}/>
                            </div>
                        </div>
                    
                    <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
                    
                </SessionExpiredContext.Provider>
            </div>
        </AlbumContext.Provider>
        
    )
}