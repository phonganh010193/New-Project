import IUser from "../models/IUser";
import { LoginRequest, LoginResponse } from "../models/Login";
import { useState } from 'react';
import { httpClient } from "../../../util/api";

export interface IProvideAuth {
    authUser: IUser;
    isLoadingUser: boolean;
    isLoading: boolean;
    error: string;
    userSignOut: (callbackFun?: any) => void;
    userLogin: (user: LoginRequest, callbackFun?: any) => void;
    userSignup: (user: LoginRequest, callbackFun?: any) => void;
    token: string;
}

export const useProvideAuth = () => {
    const [authUser, setAuthUser] = useState(null);
    const [error, setError] = useState('');
    const [isLoadingUser, setLoadingUser] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState<string>('');
  
    const fetchStart = () => {
      setLoading(true);
      setError('');
    };
  
    const fetchSuccess = () => {
      setLoading(false);
      setError('');
    };
  
    const fetchError = (error: string) => {
      setLoading(false);
      setError(error);
    };
  
    const userLogin = (user: LoginRequest, callbackFun: any) => {
      fetchStart();
      httpClient
        .post<LoginResponse>('auth/login', user)
        .then(({data}) => {
          fetchSuccess();
          httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
          localStorage.setItem('token', data.access_token);
          setToken(data.access_token);
        //   getAuthUser();
          if (callbackFun) callbackFun();
        })
        .catch(function (error: string) {
          fetchError(error);
        });
    };
    return {
        userLogin
    }

    
  
}