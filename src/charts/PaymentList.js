import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import axios from 'axios';

export default function Frontend() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState([]);
 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getArac');
      setDataList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete_arac/${id}`);
      if (response.data === 'basarili') {
        fetchData();
      } else {
        console.error('Silme işlemi başarısız');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    // Düzenleme işlemleri için gerekli kodu burada implement edebilirsiniz
  };

  const filteredList = dataList.filter(item =>
    item.kullanici.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kullanici.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plaka.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Arama"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: <SearchIcon />,
          style: { backgroundColor: 'white' }
        }}
      />
      <TableContainer component={Paper} style={{ maxHeight: '500px', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Araç Plakası</TableCell>
              <TableCell>Ödeme Tutarı</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.kullanici.ad}</TableCell>
                <TableCell>{item.kullanici.soyad}</TableCell>
                <TableCell>{item.plaka}</TableCell>
                <TableCell>{item.odeme_tutari}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item.id)} style={{ color: 'blue ' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
