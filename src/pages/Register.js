import React, {SyntheticEvent, useState} from 'react'; 
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [tckn, setTckn] = useState('');
  const [phone, setPhone] = useState('');
  const [email,setMail] = useState('');
  const [password,setPassword] =useState('');
  const [navigate,setNavigate] = useState(false);

  const kayitOl = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8000/api/register',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name,
        lastname,
        phone,
        tckn,
        email,
        password
      })
      
    });
    setNavigate(true);
 
  }
  if(navigate){
  return <Navigate to="/"/>
  }
    


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        backgroundColor: '#FFA000',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '40px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>KAYIT OL</h1>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder='Ad' />
        </div>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Soyad' />
        </div>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={tckn} onChange={(e) => setTckn(e.target.value)} placeholder='TC Kimlik Numarası' />
        </div>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Telefon Numarası' />
        </div>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={email} onChange={(e) => setMail(e.target.value)} placeholder='Email' />
        </div>
        <div className="form-group" style={{ marginRight: '10px' }}>
          <input type="text" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Şifre' />
        </div>
        <div className="form-group text-center" >
          <button onClick={kayitOl} className='btn btn-primary' style={{ backgroundColor: '#009688' ,marginLeft:'100px'}}>KAYIT OL</button>
        </div>
        
       
      </div>
    </div>
  );
}
