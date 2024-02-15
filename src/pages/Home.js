import React from 'react';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack } from '@mui/material';
import "../Dash.css";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BasicTable from '../charts/BasicTable';
import { LineChart } from '../charts/LineChart'; 
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function Home() {
  const [totalDistinctPlakaCount, setTotalDistinctPlakaCount] = useState(0);
  const [totalVehicleCount, setTotalVehicleCount] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:8000/api/get_total_distinct_plaka_count`)
        .then(response => {
            const count = response.data.totalDistinctPlakaCount;
            setTotalDistinctPlakaCount(count);
        })
        .catch(error => {
            console.error("API isteği sırasında hata oluştu:", error);
        });
        axios.get(`http://localhost:8000/api/get-total-vehicle-count`)
      .then(response => {
        const count = response.data.totalVehicleCount;
        setTotalVehicleCount(count);
      })
      .catch(error => {
        console.error("API isteği sırasında hata oluştu:", error);
      });
}, []);
 
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: 'flex', background: '#eee8cd', minHeight: '100vh' }}>
          <SideNav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card sx={{ height: 150, background: 'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)', borderRadius: '16px' }}>
                  <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <div>
                     <CheckIcon sx={{ color: "#ccd1d1" }} />
                       <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" , marginLeft:"50px" }}>
                          GİRİŞ YAPAN ARAÇ SAYISI
                       </Typography>
                       <Typography gutterBottom variant="h3" component="div" sx={{ color: "#ccd1d1" ,marginLeft:"100px"}}>
                       {totalDistinctPlakaCount}
                         </Typography>
                         </div>
                         <Link to="/list"> 
                         <InfoIcon sx={{ color: "#ccd1d1", marginBottom: "100px", cursor: 'pointer' }} />
                         </Link>
                         </div>
                   </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card sx={{ height: 150, background: 'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)', borderRadius: '16px' }}>
                  <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <div>
                     <CloseIcon sx={{ color: "#ccd1d1" }} />
                       <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1", marginLeft:"50px"}}>
                          ÇIKIŞ YAPAN ARAÇ SAYISI
                       </Typography>
                       <Typography gutterBottom variant="h3" component="div" sx={{ color: "#ccd1d1" , marginLeft:"110px" }}>
                          8
                         </Typography>
                         </div>
                         <InfoIcon sx={{ color: "#ccd1d1" , marginTop: "-100px"  }} />
                         </div>
                   </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card sx={{ height: 150, background: 'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)', borderRadius: '16px' }}>
                  <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <div>
                     <ControlPointIcon sx={{ color: "#ccd1d1" }} />
                       <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" ,marginLeft:"60px" }}>
                          TOPLAM ARAÇ SAYISI
                       </Typography>
                       <Typography gutterBottom variant="h3" component="div" sx={{ color: "#ccd1d1" ,marginLeft:"100px"}}>
                       {totalVehicleCount}
                         </Typography>
                         </div>
                         <InfoIcon sx={{ color: "#ccd1d1" , marginTop: "-100px"  }} />
                         </div>
                   </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ height: 20 }} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: '60vh', borderRadius: '16px' }}>
                  <CardContent>
                    <LineChart/>
                  </CardContent>
                </Card>
              </Grid>
             
              <Grid item xs={4}>
                <Card sx={{ height: '60vh', borderRadius: '16px' }}>
                  <CardContent>
                    <BasicTable/>
                    
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
