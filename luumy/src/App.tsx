import React from 'react';
import Navbar from './components/Navbar';
import AlbumList from './components/AlbumList';


function App() {
  return (
    <div>
      <Navbar/>
      <div className='bg-purple-100 h-screen'>
        <AlbumList/>
      </div>
    </div>
    
  );
}

export default App;
