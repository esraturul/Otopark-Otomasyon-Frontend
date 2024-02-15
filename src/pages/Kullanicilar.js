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
import { IconButton, Modal, TextField, Button } from '@mui/material';
import { getKullanicilar } from '../api';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Kullanicilar() {
  const navigate = useNavigate();
  const [InputErrorList, setInputErrorList] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [kullanici, setKullanicilar] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newUserData, setNewUserData] = useState({
    ad: '',
    soyad: '',
    tckn: '',
    telefon_numarasi: ''
  });
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchKullanicilar = async () => {
      const response = await getKullanicilar();
      setKullanicilar(response);
    };
    fetchKullanicilar();
  }, []);

  const handleActionClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  async function deleteKullanici(id) {
    let result = await fetch("http://localhost:8000/api/delete/" + id, {
      method: 'DELETE'
    });
    result = await result.json();
    console.warn(result);
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    const data = {
      ad: newUserData.ad,
      soyad: newUserData.soyad,
      tckn: newUserData.tckn,
      telefon_numarasi: newUserData.telefon_numarasi,
    };

    axios.post(`http://localhost:8000/api/kullanici/add`, data)
      .then(res => {
        alert(res.data.message);
        navigate('/kullanicilar');
        handleCloseDialog();
      })
      .catch(function(error) {
        if (error.response) {
          if (error.response.status === 442) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex', background: 'linear-gradient(158deg, rgb(224, 224, 224) 0%, rgb(223, 237, 254) 100%)', minHeight: '100vh' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#eee8cd" }}>
          <h1>Kullanıcılar</h1>
          <Box mt={3}>
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <TableContainer component={Paper}>
              <Box mb={0}>
                <Table sx={{ marginLeft: '20px' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>AD</TableCell>
                      <TableCell>SOYAD</TableCell>
                      <TableCell>TCKN</TableCell>
                      <TableCell>TELEFON NUMARASI</TableCell>
                      <TableCell align="left" padding="none">
                        <IconButton aria-label="add-person" color="primary" onClick={handleActionClick}>
                          <PersonAddAltIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kullanici
                      .filter((row) =>
                        `${row.ad} ${row.soyad} ${row.tckn} ${row.telefon_numarasi}`
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.ad}</TableCell>
                          <TableCell>{row.soyad}</TableCell>
                          <TableCell>{row.tckn}</TableCell>
                          <TableCell>{row.telefon_numarasi}</TableCell>
                          <TableCell align="left" padding="none" style={{ paddingRight: '30px' }}>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              size="small"
                              onClick={() => {
                                setSelectedUser(row);
                                setConfirmDeleteDialogOpen(true); // Silme onay penceresini aç
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                      component="div"
                      count={kullanici.length}
                       page={page}
                       onPageChange={handleChangePage}
                          rowsPerPage={rowsPerPage}
                          rowsPerPageOptions={[10, 25, 50]}
                          onChangeRowsPerPage={(event) => {
                          setRowsPerPage(parseInt(event.target.value, 10));
                           setPage(0);
                            }}
                          style={{ marginLeft: 'auto' }} 
                            />
              </Box>
            </TableContainer>

          </Box>
        </Box>
      </Box>
      <Modal open={openDialog} onClose={handleCloseDialog}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <TextField label="Ad" name="ad" value={newUserData.ad} onChange={handleNewUserChange} fullWidth />
          <span className='text-danger'>{InputErrorList.ad}</span>
          <br/><br/> 
          <TextField label="Soyad" name="soyad" value={newUserData.soyad} onChange={handleNewUserChange} fullWidth />
          <span className='text-danger'>{InputErrorList.soyad}</span>
          <br/><br/> 
          <TextField label="TCKN" name="tckn" value={newUserData.tckn} onChange={handleNewUserChange} fullWidth />
          <span className='text-danger'>{InputErrorList.tckn}</span>
          <br/><br/> 
          <TextField label="Telefon Numarası" name="telefon_numarasi" value={newUserData.telefon_numarasi} onChange={handleNewUserChange} fullWidth />
          <span className='text-danger'>{InputErrorList.telefon_numarasi}</span>
          <br/><br/> 
          <Button variant="contained" color="primary" onClick={handleAddUser} style={{ marginTop: '16px' }}>
            Kullanıcı Ekle
          </Button>
        </Box>
      </Modal>
      <Modal open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <h2>Bu kullanıcıyı silmek istediğinizden emin misiniz?</h2>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '16px' }}
            onClick={() => {
              deleteKullanici(selectedUser.id);
              setConfirmDeleteDialogOpen(false);
            }}
          >
            Sil
          </Button>
          <Button variant="contained" onClick={() => setConfirmDeleteDialogOpen(false)}>
            İptal
          </Button>
        </Box>
      </Modal>
    </>
  );
}
