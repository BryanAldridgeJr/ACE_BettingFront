import Login from './Login';
import Home from './Home';
import Nfl from './Nfl';
import Signup from './Signup';
import React from 'react';
import Profile from './Profile';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/nfl' element={<Nfl/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        
      </Routes>       
    </BrowserRouter>
  );
}

export default App;
