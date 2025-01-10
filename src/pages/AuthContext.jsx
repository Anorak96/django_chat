import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [Authenticated, setAuthenticated] = useState(false)

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date > current_time){
                setAuthenticated(true)
            }
        }
    }
    
    useEffect(function(){
        handleAuth
    }, [])

    const authValue = {Authenticated, setAuthenticated}

    return (
        <AuthContext.Provider value={authValue} >
            {children}
        </AuthContext.Provider>
    )
}