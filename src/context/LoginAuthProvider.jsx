import { createContext, useContext, useState } from "react"
import { firebaseInit } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const {auth} = firebaseInit()

const LoginContext = createContext();


const LoginAuthProvider = ({children}) => {

    const [errorState, setErrorState] = useState(null)
    const [loginUser, setLoginUser] = useState(null)

    const login = async (email,password)=>{
        try{
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user
            setLoginUser(user)
            console.log(user)
        }
        catch(error){
            console.error(error)
            setErrorState(error.message)
            console.log("ErrorState : ",errorState)
        }

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

    const createUser = async (email,password)=>{
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = result.user
            console.log(user)
            

        }
        catch(error){
            console.error(error)
        }

    
    }

  return (
    <LoginContext.Provider
    
     value={{
        login,
        createUser,
        errorState,
        loginUser,
        logout
     }}
    >
        {children}
        
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginAuthProvider