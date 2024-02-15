import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import UserSideNav from './UserSidenav';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import EditSidebar from './EditSidebar';


function RezervasyonListe() {
  const location = useLocation();
  const [state, setLocationState] = useState();
  const [editOpen, setEditOpen] = useState(false); 
  const id = parseInt(localStorage.getItem("user-id"));
  
  useEffect(() => {
    let state = location.state;
    setLocationState(state);

    localStorage.setItem('rezervasyonData', JSON.stringify(state));
  }, [location.state]);

  

  const handleRowClick = () => {
    setEditOpen(true);
    
  };
  
  async function deleteOperation(id)
  {
    let result = await fetch("http://localhost:8000/api/delete_rezervasyon/"+id,{
      method:'DELETE'
    });
    result = await result.json();
    console.warn(result)

  }
  

  return (
    <>
      <div className='bgcolor'>
        <UserNavbar />
        <Box height={70} />
        <Box sx={{ display: 'flex', background: '#eee8cd', minHeight: '100vh' }}>
          <UserSideNav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: '100vh', borderRadius: '16px' }}>
                  <CardContent>
                    <h2>Tüm Rezervasyonlar</h2>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Plaka</TableCell>
                            <TableCell>Giriş Tarihi</TableCell>
                            <TableCell>Çıkış Tarihi</TableCell>
                            <TableCell>Giriş Saati</TableCell>
                            <TableCell>Çıkış Saati</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {state && (
                            <TableRow onClick={handleRowClick}>
                              <TableCell>{state.plaka}</TableCell>
                              <TableCell>{state.giris_tarihi}</TableCell>
                              <TableCell>{state.cikis_tarihi}</TableCell>
                              <TableCell>{state.giris_saati}</TableCell>
                              <TableCell>{state.cikis_saati}</TableCell>
                              <TableCell>
                                <IconButton aria-label="edit" color="primary">
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" color="secondary" onClick={deleteOperation} >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
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

export default RezervasyonListe;
