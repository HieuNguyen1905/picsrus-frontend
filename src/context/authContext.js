import { createContext, useEffect, useState } from "react"
import axios from "axios"



export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("User")) || null)

    const login = async(input)=>{
        const res = await axios.post("https://picrsus.herokuapp.com/api/auth/login", input);
        setCurrentUser(res.data)
    };

    const signup = async(input)=>{
        const res = await axios.post("https://picrsus.herokuapp.com/api/auth/signup", input);
        setCurrentUser(res.data)
    };
    
    const logout = async()=>{
        setCurrentUser(null)
    };

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return <AuthContext.Provider value={{currentUser, login, signup, logout}}>{children}</AuthContext.Provider>
}