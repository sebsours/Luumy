import React from 'react';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import AlbumCard from './components/AlbumCard';
import AlbumList from './components/AlbumList';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      {/* <Route path='/search/:query' element={<AlbumList/>} /> */}
    </Routes>
    
  );
}

export default App;
