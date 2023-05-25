import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { Sign } from 'crypto';
// import AlbumCard from './components/AlbumCard';
// import AlbumList from './components/AlbumList';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      {/* <Route path='/search/:query' element={<AlbumList/>} /> */}
      <Route path='/login' element={<Auth />}/>
      <Route path='/signup' element={<Signup />}/>
    </Routes>
    
  );
}

export default App;
