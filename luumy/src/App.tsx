import React from 'react';
import UserList from './pages/UserList';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import Page404 from './pages/page404';
import { Routes, Route } from 'react-router-dom';


function App() {


  return (
    
    <Routes>
      <Route path='/' element={<Auth />}/>
      <Route path='/user/:username' element={<UserList />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='*' element={<Page404 />}/>
    </Routes>

    
    
  );
}

export default App;
