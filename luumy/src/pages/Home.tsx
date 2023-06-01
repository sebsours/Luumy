import Navbar from '../components/Navbar';
import AlbumList from '../components/AlbumList';
import SearchModal from '../components/SearchModal';
import { useState } from 'react';

export default function Home()
{
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className=''>
            <Navbar openModal={() => setModalOpen(true)}/>
            <div className='h-screen bg-purple-200'>
                {/* <AlbumList/> */}
            </div>
            <SearchModal isVisible={modalOpen} closeModal={() => setModalOpen(false)}/>
        </div>
        
    )
}