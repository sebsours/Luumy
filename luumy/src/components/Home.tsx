import Navbar from './Navbar';
import AlbumList from './AlbumList';
import SearchModal from './SearchModal';
import { useState } from 'react';

export default function Home()
{
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Navbar openModal={() => setModalOpen(true)}/>
            <div className='bg-purple-100 h-screen'>
                {/* <AlbumList/> */}
            </div>
            <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
        </div>
        
    )
}