import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { Routes, Route } from 'react-router-dom';
// import AlbumCard from './components/AlbumCard';
// import AlbumList from './components/AlbumList';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      {/* <Route path='/search/:query' element={<AlbumList/>} /> */}
      <Route path='/login' element={<Auth />}/>
    </Routes>
    
  );
}

export default App;
