import React from 'react';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import VehicleList from '../components/ADMİN/VehicleList';

export default function List() {
  return (
    <>
    <div className='bgcolor'>
      
    <Navbar/>
    <Box height={10}/>
    <Box sx={{ display: 'flex', background: 'linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(223, 237, 254) 100%)', minHeight: '100vh' }}>

    <Box component="main" sx={{ flexGrow: 1,  background:"#eee8cd" }}>
    <VehicleList/>
      </Box>

    </Box>

    </div>

    </>

  )
}