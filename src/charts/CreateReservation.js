import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReservationForm.css';

const api = `http://localhost:8000/api/arac_tablo/add`;

const CreateReservation = () => {
  const [plaka, setPlaka] = useState('');
  const [giris_tarihi, setGirisTarihi] = useState('');
  const [cikis_tarihi, setCikisTarihi] = useState('');
  const [giris_saati, setGirisSaati] = useState('');
  const [cikis_saati, setCikisSaati] = useState('');
  const navigate = useNavigate();

  const post = async (e) => {
    e.preventDefault();
    const id = parseInt(localStorage.getItem("user-id"));

    await axios.post(api, {
      "kullanici_id": id,
      plaka: plaka,
      giris_tarihi: giris_tarihi,
      cikis_tarihi: cikis_tarihi,
      giris_saati: giris_saati,
      cikis_saati: cikis_saati,
    });

    
    const yeniRezervasyon = {
      plaka,
      giris_tarihi,
      cikis_tarihi,
      giris_saati,
      cikis_saati
    };
    navigate('/rezervasyonliste', { state: yeniRezervasyon });
    
    setPlaka('');
    setGirisTarihi('');
    setCikisTarihi('');
    setGirisSaati('');
    setCikisSaati('');
  };

  return (
    <div className="form-box">
      <h3>Rezervasyon Formu</h3>
      <div className="form-container">
        <form onSubmit={post} className="reservation-form">
          <div className="form-group">
            <label htmlFor="plaka">Plaka</label>
            <input
              id="plaka"
              value={plaka}
              onChange={(e) => setPlaka(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="girisTarihi">Giriş Tarihi</label>
            <input
              id="girisTarihi"
              value={giris_tarihi}
              onChange={(e) => setGirisTarihi(e.target.value)}
              type="date"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cikisTarihi">Çıkış Tarihi</label>
            <input
              id="cikisTarihi"
              value={cikis_tarihi}
              onChange={(e) => setCikisTarihi(e.target.value)}
              type="date"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="girisSaati">Giriş Saati</label>
            <input
              id="girisSaati"
              value={giris_saati}
              onChange={(e) => setGirisSaati(e.target.value)}
              type="time"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cikisSaati">Çıkış Saati</label>
            <input
              id="cikisSaati"
              value={cikis_saati}
              onChange={(e) => setCikisSaati(e.target.value)}
              type="time"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Rezervasyon Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservation;
