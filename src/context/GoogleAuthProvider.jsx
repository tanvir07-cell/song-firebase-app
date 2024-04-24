import { createContext, useContext, useState } from "react"

const GoogleAuthContext = createContext();

import { firebaseInit } from "../firebase";

import {  signOut } from "firebase/auth";

const {auth} = firebaseInit()

const GoogleAuthProviderContext = ({children}) => {
    const [googleUser, setGoogleUser] = useState(null);

    const handleGoogleUser = (user) => {
        setGoogleUser(user)
    }

    

      const googleSignOut = async () => {
        try {
          await signOut(auth);
          setGoogleUser(null)
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <GoogleAuthContext.Provider value={{
        googleSignOut,
        googleUser,
        handleGoogleUser
    
    }}>
        {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => useContext(GoogleAuthContext)

export default GoogleAuthProviderContext