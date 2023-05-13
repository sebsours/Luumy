import Navbar from './Navbar';
import AlbumList from './AlbumList';
import SearchModal from './SearchModal';

export default function Home()
{
    return (
        <div>
            <Navbar/>
            <div className='bg-purple-100 h-screen'>
                {/* <AlbumList/> */}
            </div>
            <SearchModal/>
        </div>
        
    )
}