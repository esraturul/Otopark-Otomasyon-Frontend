import axios from "axios";


export const getAraclarByKullaniciId= async(kullanici_id) =>{
    const response= await axios.get(`http://localhost:8000/api/araclar/${kullanici_id}`);
    return response.data;

}
export const updateAraclar = async (id, yeniArac) => {
    const response = await axios.put(`http://localhost:8000/api/araclar/${id}`, {
        arac: yeniArac
    });
    return response.data;
}
export const updateRezervasyonlar = async (id, yeniRezervasyon) => {
    const response = await axios.put(`http://localhost:8000/api/users/${id}`,{
        rezervasyon: yeniRezervasyon
    });
    return response.data;
}

export const deleteAraclar = async (id) => {
    const response = await axios.delete(`http://localhost:8000/api/araclar/${id}`);
    return response.data;
}
export const deleteRezervasyonlar =async (id) =>{
    const response = await axios.delete(`http://localhost:8000/api/users/${id}`);
    return response.data;
}
export const getKullanicilar = async () => {
    const response = await axios.get("http://localhost:8000/api/kullanici");
    return response.data;
}
export const getAraclar = async () => {
    const response = await axios.get("http://localhost:8000/api/araclar");
    return response.data;
}
export const getPlakalar = async () => {
    const response = await axios.get("http://localhost:8000/api/plaka");
    return response.data;
}

export const login = async (request) => {
    const response = await axios.post("http://localhost:8000/api/login",request);
    return response.data;
}
export const getOdemeByPlaka= async(plaka) =>{
    const response= await axios.get(`http://localhost:8000/api/araclar/${plaka}`);
    return response.data;

}
export const register = async(request)=>{
    const response= await axios.get("http://localhost:8000/api/user",request);
    return response.data;
}
export const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/register");
    return response.data;
}




