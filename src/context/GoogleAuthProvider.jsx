import { createContext, useContext, useState } from "react"

const GoogleAuthContext = createContext();

import { firebaseInit } from "../firebase";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const {auth} = firebaseInit()

const GoogleAuthProviderContext = ({children}) => {
    const [user, setUser] = useState(null)

    const googleSignIn = async () => {
  
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log(user)
          setUser(user)
        } catch (error) {
          console.log(error)
        }
      
      
      } 

      const googleSignOut = async () => {
        try {
          await signOut(auth);
          setUser(null)
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <GoogleAuthContext.Provider value={{
        googleSignIn,
        googleSignOut,
        user
    
    }}>
        {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => useContext(GoogleAuthContext)

export default GoogleAuthProviderContext