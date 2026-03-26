import { createContext, useEffect, useState } from "react";


export const AuthContext=createContext(null);

const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(()=>{
        if(user)
        {
            localStorage.setItem('user',JSON.stringify(user));
        }
        else
        {
            localStorage.removeItem('user');
        }
    },[user]);

    const login=(data)=>{
        setUser(data);
    }
    const logout=()=>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{login,logout,user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;