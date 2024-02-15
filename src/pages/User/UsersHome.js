import React from 'react';
import UserNavbar from './UserNavbar';
import UserSideNav from './UserSidenav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack } from '@mui/material';
//import "../Dash.css";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CreateReservation from '../../charts/CreateReservation';



export default function UsersHome() {
  return (
    <>
      <div className='bgcolor'>
        <UserNavbar/>
        <Box height={70} />
        <Box sx={{ display: 'flex', background: '#eee8cd', minHeight: '100vh' }}>
          <UserSideNav/>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              
            </Grid>
            <Box sx={{ height: 20 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: '100vh', borderRadius: '16px' }}>
                  <CardContent>
                   <CreateReservation/>
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
