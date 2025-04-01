import { createContext, useState, useContext, useEffect } from "react";
import api from '../api/axios'
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [userInfor,setUserInfor] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const parsedUser = JSON.parse(userData);
          setUserInfor(parsedUser);
        
        } 
      } catch(err) {
        console.error("Error while loading...",err)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

    }
    checkAuth();
},[]);

  const login = async (email,password) => {
    try {
      const res = await api.post('/api/v1/authentication/login',{
        email,
        password
      });
      const {token,user} = res.data;
      if (!token || !user) {
        console.error('Missing token or user_data in response:', res.data);
        throw new Error('Invalid response data');
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));
      
      return {
        success: true,
        user:user
      }
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err.response?.data?.message || 'Login failed'
      };
    }

  }
  const logout = () => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUserInfor(null);
  }

  const signup = async (ID,Lname,Fname,email,password,dateofbirth,phone_number) => {
    try {
      await api.post('/api/v1/authentication/signup',{
        ID,
        Lname,
        Fname,
        email,
        password,
        dateofbirth,
        phone_number
      });
      return {
        success: true
      };
    } catch(err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err.response?.data?.message || "Signup failed"
      };
    }
  }
  return ( 
    <AuthContext.Provider 
      value = {{
        setUserInfor,
        userInfor,
        login,
        logout,
        signup,
        isAuthenticated: !!userInfor,
        isUser: userInfor?.role === 'user',
        isDoctor: userInfor?.role === 'doctor'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}