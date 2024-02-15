import { createContext, useContext,useState } from "react";
import axios from "../api/axios";
import { useNavigate} from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children})=> {
    const [user, setUser] = useStat(null)
    const getUser = async() => {
        const {data} =await axios.get('/api/user');
        setUser(data);
    }
}