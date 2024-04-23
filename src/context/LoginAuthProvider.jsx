import { createContext, useContext, useEffect, useState } from "react"
import { firebaseInit } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const {auth} = firebaseInit()

const LoginContext = createContext();


const LoginAuthProvider = ({children}) => {
    const [loginUser,setLoginUser] = useState(null)

    const handleLogin = (user)=>{
        setLoginUser(user)
    
    }
    

    


    

  

    const logout = async ()=>{
        try{
            await signOut(auth)
            setLoginUser(null)
        }
        catch(error){
            console.error(error)
        }
    }

    

  return (
    <LoginContext.Provider
    
     value={{
        loginUser,
        handleLogin,
        
        logout
     }}
    >
        {children}
        
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginAuthProvider