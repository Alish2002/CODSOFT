import { jwtDecode } from 'jwt-decode';
import axiosApi from '../axios/api';
export const  setAuthToken= (token)=>{
    if(token){
        axiosApi.defaults.headers.common['Authorization']=`Bearer ${token}`;
    }
    else{
        delete axiosApi.defaults.headers.common['Authorization'];
    }
}

export const getUser=()=>{
    const token=localStorage.getItem('token');

    const user=jwtDecode(token);

    return user;
}