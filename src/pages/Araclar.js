import React, { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getPlakalar } from '../api';
import TablePagination from '@mui/material/TablePagination';

export default function Araclar() {
  const [openDialog, setOpenDialog] = useState(false); 
  const [plaka, setPlakalar] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const plakalar= async () =>{
      await getPlakalar().then((response)=>{
        setPlakalar(response);
      })
    }
    plakalar();
  }, []);

  const handleActionClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex', background: 'linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(223, 237, 254) 100%)', minHeight: '100vh' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#eee8cd" }}>
          <h1>Araçlar</h1>
          <Box mt={3}>
            <input
              type="text"
              placeholder="Arama "
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <TableContainer component={Paper}>
              <Box mb={0}>
                <Table sx={{ marginLeft: '20px' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell >Kullanıcı No</TableCell>
                      <TableCell>Plaka No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plaka
                      .filter((row) => `${row.kullanici_id} ${row.plaka}`.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.kullanici_id}</TableCell>
                          <TableCell>{row.plaka}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
              component="div"
              count={plaka.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
              </Box>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Uyarı</DialogTitle>
        <DialogContent>
          Bu öğeyi silmek veya düzenlemek istediğinizden emin misiniz?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            İptal
          </Button>
          <Button onClick={handleCloseDialog} color="error">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
