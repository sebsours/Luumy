import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { Sign } from 'crypto';
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
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </TokenContext.Provider>
    
    
  );
}

export default App;
