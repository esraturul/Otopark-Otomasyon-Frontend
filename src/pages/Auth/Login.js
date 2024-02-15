import React, { useState } from 'react'; 
import axios from 'axios';
import { Navigate,Link } from 'react-router-dom';
import { login } from '../../api';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [navigate,setNavigate] = useState(false);
  const [id,setId]=useState();
  


  const submit = async (e) => {
    e.preventDefault();
   /* const reponse=await fetch ('http://localhost:8000/api/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body:JSON.stringify({
        email,
        password,
        role
      })
    });
    
    console.log(reponse.data);
    */
   const request={
    "email":email,
    "password":password
   };
   await login(request).then((res)=>{localStorage.setItem("user-id",res.message.id)})
    setNavigate(true);
  }
  if (navigate) {
    if (role === 'admin') {
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/usershome" />;
    }
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px'
      }}>
        <h2>OTOPARK OTOMASYON</h2>
        <h2 style={{ marginBottom: '20px' }}>Giriş Yap</h2>
        <form onSubmit={submit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '10px', width: '100%' }}>
            <label style={{ marginBottom: '5px' }}>Giriş Türü:</label>
            <select value={role} name='role'  onChange={e => setRole(e.target.value)} style={{ padding: '5px', width: '100%' }}>
              <option value="user">Kullanıcı</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px', width: '90%' }}>
            <label style={{ marginBottom: '5px' }}>E-posta:</label>
            <input type="email" value={email} name='email' onChange={e => setEmail(e.target.value)} style={{ padding: '5px', width: '107%' }} />
          </div>
          <div style={{ marginBottom: '10px', width: '90%' }}>
            <label style={{ marginBottom: '5px' }}>Parola:</label>
            <input type="password" value={password} name='password' onChange={e => setPassword(e.target.value)} style={{ padding: '5px', width: '107%' }} />
          </div>
          <br/>
          <button type="submit" style={{ padding: '5px', backgroundColor: '#546E7A', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}>Giriş Yap</button>
        </form>
        <br/>
        <Link to="/register" style={{ width: '100%', textDecoration: 'none', color: '#546E7A', fontWeight: 'bold', textAlign: 'center' }}>
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
}

export default Login;
