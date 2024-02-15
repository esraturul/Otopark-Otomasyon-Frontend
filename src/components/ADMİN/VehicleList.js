import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAraclar } from '../../api';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';

export default function VehicleList() {
  const [araclar, setAraclar] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPrice, setSortByPrice] = useState('asc');
  const [sortByGirisTarihi, setSortByGirisTarihi] = useState('asc');
  const [sortByCikisTarihi, setSortByCikisTarihi] = useState('asc');
  const [sortByOtoparkSure, setSortByOtoparkSure] = useState('asc');

  useEffect(() => {
    const fetchAraclar = async () => {
      const response = await getAraclar();
      setAraclar(response);
    };
    fetchAraclar();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handlePriceClick = () => {
    setSortByPrice(sortByPrice === 'asc' ? 'desc' : 'asc');
  };

  const handleGirisTarihiClick = () => {
    setSortByGirisTarihi(sortByGirisTarihi === 'asc' ? 'desc' : 'asc');
  };

  const handleCikisTarihiClick = () => {
    setSortByCikisTarihi(sortByCikisTarihi === 'asc' ? 'desc' : 'asc');
  };

  const handleOtoparkSureClick = () => {
    setSortByOtoparkSure(sortByOtoparkSure === 'asc' ? 'desc' : 'asc');
  };

  const filteredAraclar = araclar.filter(
    (row) =>
      `${row.plaka} ${row.giris_tarihi} ${row.cikis_tarihi} ${row.odeme_tutari} ${row.kaldigi_dakika}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const sortedAraclar = [...filteredAraclar].sort((a, b) => {
    if (sortByPrice === 'asc') {
      return a.odeme_tutari - b.odeme_tutari;
    } else {
      return b.odeme_tutari - a.odeme_tutari;
    }
  });

  const sortedByGirisTarihiAraclar = [...sortedAraclar].sort((a, b) => {
    if (sortByGirisTarihi === 'asc') {
      return new Date(a.giris_tarihi) - new Date(b.giris_tarihi);
    } else {
      return new Date(b.giris_tarihi) - new Date(a.giris_tarihi);
    }
  });

  const sortedByCikisTarihiAraclar = [...sortedByGirisTarihiAraclar].sort((a, b) => {
    if (sortByCikisTarihi === 'asc') {
      return new Date(a.cikis_tarihi) - new Date(b.cikis_tarihi);
    } else {
      return new Date(b.cikis_tarihi) - new Date(a.cikis_tarihi);
    }
  });

  const sortedByOtoparkSureAraclar = [...sortedByCikisTarihiAraclar].sort((a, b) => {
    if (sortByOtoparkSure === 'asc') {
      return a.kaldigi_dakika - b.kaldigi_dakika;
    } else {
      return b.kaldigi_dakika - a.kaldigi_dakika;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box
        sx={{
          display: 'flex',
          background:
            'linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(223, 237, 254) 100%)',
          minHeight: '100vh',
        }}
      >
        <SideNav />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, background: '#eee8cd' }}
        >
          <h1>Rezervasyonlar</h1>
          <Box mt={3}>
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <Box sx={{display:'flex'}}>
              <Button onClick={handleOtoparkSureClick} variant="outlined" color="primary" sx={{ marginLeft: '700px' ,backgroundColor: 'brown', color: 'white', '&:hover':{backgroundColor: 'brown',opacity:1,}, }}>
                Otopark Süresine Göre Filtreleme
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plaka</TableCell>
                      <TableCell>Giriş Tarihi</TableCell>
                      <TableCell>Çıkış Tarihi</TableCell>
                      <TableCell>Ödeme Tutarı</TableCell>
                      <TableCell>Otopark Süresi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedByOtoparkSureAraclar
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.plaka}</TableCell>
                          <TableCell>{row.giris_tarihi}</TableCell>
                          <TableCell>{row.cikis_tarihi}</TableCell>
                          <TableCell>{row.odeme_tutari}</TableCell>
                          <TableCell>{row.kaldigi_dakika}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={sortedByOtoparkSureAraclar.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
