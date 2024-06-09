import {createSlice}  from '@reduxjs/toolkit'
import {setAuthToken} from '../utils/utils';
import axiosApi from '../axios/api';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const initialState={
       token: localStorage.getItem('token'),
       isAuthenticated:null,
       loading:true,
       user:null
}
const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLoaded: (state,action)=>{
            state.isAuthenticated=true;
            state.loading=false;
            state.user=action.payload;
            
        },
        registerSuccess: (state,action)=>{    
            // state.isAuthenticated=true;
            state.loading=false;
            state.user=action.payload.user;
            console.log(state.user);
        },
        loginSuccess: (state,action)=>{
            state.token=action.payload.token;
            state.isAuthenticated=true;
            state.loading=false;
            state.user=action.payload.user;
            localStorage.setItem('token',action.payload.token);
        },
        authError: (state)=>{
            state.token=null;
            state.isAuthenticated=false;
            state.loading=false;
            state.user=null;
            localStorage.removeItem('token');
            setAuthToken(null);
        },
        logout: (state)=>{
            state.token=null;
            state.isAuthenticated=false;
            state.loading=false;
            state.user=null;
            localStorage.removeItem('token');
            setAuthToken(null);
        }
    }
});

export const {
    userLoaded,
    registerSuccess,
    loginSuccess,
    authError,
    logout
}= authSlice.actions;

export default authSlice.reducer;

// Async Actions  ( using Redux Thunk)

export const loadUser=()=> async(dispatch)=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const token=localStorage.getItem('token');
        const user=jwtDecode(token);
        dispatch(userLoaded(user));
    }
    catch(err){
        dispatch(authError());
    }
};

export const register=({name,email,password})=> async(dispatch)=>{
    const body=JSON.stringify({name,email,password});
    
    try{
        const res= await axiosApi.post('user/auth/register',body);
        console.log(res.data);
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        dispatch(authError());
    }
}

export const login=({email,password})=>async(dispatch)=>{
    
    const body=JSON.stringify({email,password});

    try{
        const res=await axiosApi.post('user/auth/login',body);
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        dispatch(loadUser());
        

    }
    catch(err){
        dispatch(authError());
    }
}