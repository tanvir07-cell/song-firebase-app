import { collection, doc, onSnapshot } from 'firebase/firestore'
import Nav from '../components/Header/Nav'

import { firebaseInit } from '../firebase'
import { useLogin } from '../context/LoginAuthProvider'
import { useGoogleAuth } from '../context/GoogleAuthProvider'
import { useEffect, useState } from 'react'
const {auth,firestore} = firebaseInit()









const Home = () => {
  const [tune,setTune] = useState([])
  const {loginUser} = useLogin();
const {googleUser} = useGoogleAuth()

const userColref = collection(firestore,"users");

let docRef;
if(googleUser?.uid){
  docRef = doc(userColref,googleUser.uid)
}
else if(loginUser?.uid){
  docRef = doc(userColref,loginUser.uid)
  
}
else{
  docRef = doc(userColref)
}


useEffect(()=>{
  onSnapshot(docRef,(docSnap)=>{
    console.log(docSnap.data())
    setTune([
      ...tune,
      docSnap.data()
    ])
  })

},[])



  return (
    <div className='bg-fountain-blue-600'>
        <Nav/>
        <div className='flex items-center justify-center h-[100vh] p-90 text-fountain-blue-50'>
            <h1 className='text-5xl font-bold'>Welcome to TR | SONG</h1>
            {
              tune?.tunes?.map((tune,index)=>{
                return (
                  <div key={index}>
                    <h2>{tune.artist}</h2>
                    <h3>{tune.song}</h3>
                  </div>
                )
              
              })
            }
            
        </div>
    </div>
  )
}

export default Home