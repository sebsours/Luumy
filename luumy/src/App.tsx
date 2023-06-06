import React from 'react';
import UserList from './pages/UserList';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';

// import AlbumCard from './components/AlbumCard';
// import AlbumList from './components/AlbumList';
export const TokenContext = React.createContext<string | null>(null);

function App() {
  const [token, setToken] = React.useState<string | null>(null);
  
  const handleToken = (userToken:string) => { setToken(userToken); };

  return (
    <TokenContext.Provider value={token}>
      <Routes>
        <Route path='/' element={<Auth handleToken={handleToken}/>}/>
        {/* <Route path='/search/:query' element={<AlbumList/>} /> */}
        <Route path='/user/:username' element={<UserList />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </TokenContext.Provider>
    
    
  );
}

export default App;
