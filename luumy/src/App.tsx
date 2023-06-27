import React from 'react';
import UserList from './pages/UserList';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

// import AlbumCard from './components/AlbumCard';
// import AlbumList from './components/AlbumList';
export const UserContext = React.createContext<Object | null>(null);

function App() {
  const [userData, setUserData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  const handleUserData = (userData:Object) => {
     setUserData(userData); 
     setLoggedIn(true);
  };

  return (
    <UserContext.Provider value={userData}>
      <Routes>
        <Route path='/' element={<Auth handleUserData={handleUserData}/>}/>
        {/* <Route path='/search/:query' element={<AlbumList/>} /> */}
        <Route path='/user/:username' element={<UserList />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </UserContext.Provider>
    
    
  );
}

export default App;
