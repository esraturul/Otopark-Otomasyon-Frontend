import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Box from '@mui/material/Box';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import UserSideNav from './UserSidenav';

export default function Odemeler() {
  const [plaka, setPlaka] = useState(''); // Rezervasyon formundan gelen plaka
  const [odemeBilgisi, setOdemeBilgisi] = useState(null);

  const handlePlakaChange = (event) => {
    setPlaka(event.target.value);
  };

  const handlePlakaSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/araclar`);
      const data = await response.json();

      setOdemeBilgisi(data); 
    } catch (error) {
      console.error('API hatası:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box
        sx={{
          display: 'flex',
          background: 'linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(223, 237, 254) 100%)',
          minHeight: '100vh'
        }}
      >
        <UserSideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#eee8cd" }}>
          <Box sx={{ height: 40 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Araç Ödeme Sorgulama</Typography>
                  <TextField
                    label="Araç Plakası"
                    variant="outlined"
                    value={plaka}
                    onChange={handlePlakaChange}
                  />
                  <Box mt={2}>
                    <Button variant="contained" onClick={handlePlakaSubmit}>
                      Ödeme Sorgula
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ height: 20 }} />

          {odemeBilgisi && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Ödeme Bilgisi</Typography>
                    <Typography>Plaka: {odemeBilgisi.plaka}</Typography>
                    <Typography>Ödeme Tutarı: {odemeBilgisi.odeme_tutari} TL</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          <Box sx={{ height: 20 }} />

        </Box>
      </Box>
    </>
  );
}
