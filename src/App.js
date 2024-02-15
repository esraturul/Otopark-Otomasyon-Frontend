import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Kullanicilar from './pages/Kullanicilar';
import Araclar from './pages/Araclar';
import UsersHome from './pages/User/UsersHome';
import Odemeler from './pages/User/Odemeler';
import Register from './pages/Register';
import Login from './pages/Auth/Login';
import RezervasyonListe from './pages/User/RezervasyonListe';




 function App() {

  const [auth,setAuth] = useState(false)
  return <>
  <BrowserRouter> 
    <Routes>

      <Route path= "/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/usershome" element={<UsersHome />} />
      <Route path="/rezervasyonliste" element={<RezervasyonListe/>}/>
      <Route path="/odemeler" element={<Odemeler />} />

    
      <Route path="/home" exact element= {<Home/>}></Route>
      <Route path="/list" exact element= {<List/>}></Route>
      <Route path="/kullanicilar" exact element= {<Kullanicilar/>}></Route>
      <Route path="/araclar" exact element= {<Araclar/>}></Route>
      
    </Routes>
  </BrowserRouter>
  </>
}

export default App;

