import Nav from "../components/Header/Nav"
import LOGIN from "../assets/login.svg"
import { FaGoogle } from "react-icons/fa";
import { useGoogleAuth } from "../context/GoogleAuthProvider";
import {  useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword,GithubAuthProvider,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { firebaseInit } from "../firebase";
import { setDoc,doc, collection, onSnapshot, getDoc } from "firebase/firestore";

const {auth,firestore} = firebaseInit()

const colRef = collection(firestore,"users")

const docRef= doc(colRef)















const SignUp = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name:'',
  
  })

  const {handleGoogleUser,googleUser} = useGoogleAuth();




  const handleFormSubmit = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,userInfo.email,userInfo.password)
    .then((userCredential)=>{
      const user = userCredential.user

      const matchIdDocRef = doc(colRef,user.uid);

      getDoc(matchIdDocRef)
      .then((docSnap)=>{
        if(docSnap.exists()){
          console.log("User exists")
        }
        else{
          setDoc(matchIdDocRef,{
            name:userInfo.name,
            email:userInfo.email,
            uid:user.uid,
            isGoogle:false
          })
        }
      })

    

      console.log("Create User : ",user)
      navigate('/signin')
      
      toast.success("User Created Successfully")

    })
    .catch((error)=>{
      if(error.code === "auth/email-already-in-use"){
        toast.error("Email Already In Use")
      }
    })
  }

  const handleGoogleSignIn = (e)=>{
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((userCredential)=>{
      console.log("User : ",userCredential.user)
      handleGoogleUser(userCredential.user);

      const existsDocRef = doc(colRef,userCredential.user.uid)

      getDoc(existsDocRef)
      .then((docSnap)=>{
        if(docSnap.exists()){
          console.log("User exists")
        }
        else{
          setDoc(existsDocRef,{
            name:userCredential.user.displayName,
            email:userCredential.user.email,
            uid:userCredential.user.uid,
            isGoogle:true
          })
        }
      })


      
    
      navigate('/')
      toast.success("Google Sign In Successfull")
    
    })
    .catch(err=>{
      toast.error(err.message)
    })
    
  }


  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setUserInfo({
      ...userInfo,
      [name]:value
    })
  }

  useEffect(()=>{
    onSnapshot(colRef,(snapshot)=>{
      snapshot.forEach((doc)=>{
        console.log("Data : ",doc.data())
      })

    })

   

  },[])

  

  return (
    <>
    <Nav/>
    
    <div className="hero min-h-screen bg-fountain-blue-600 text-fountain-blue-50">
  <div className="hero-content flex-col lg:flex-row-reverse gap-40">
    <img src={LOGIN} alt="" className="h-[100%] w-[100%]" />
   
    <div className="glass card shrink-0 w-full max-w-sm  bg-fountain-blue-700
    backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200
    ">
      <form className="card-body">
 
      <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text text-fountain-blue-50">Name</span>
          </label>
          <input type="text" 
          name = "name"
          id = "name"
          onChange={handleInputChange}
          placeholder="name" className="input input-bordered bg-fountain-blue-900"  />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text text-fountain-blue-50">Email</span>
          </label>
          <input type="email" 
          name = "email"
          id = "email"
          onChange={handleInputChange}
          placeholder="email" className="input input-bordered bg-fountain-blue-900"  />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text text-fountain-blue-50">Password</span>
          </label>
          <input type="password"
           onChange={handleInputChange}
           name="password"
            id="password"

          placeholder="password" className="input input-bordered bg-fountain-blue-900"  />
         
          <label className="label">
          <span>Already have any account?</span> 
            <Link to = "/signin" className="label-text-alt link link-hover text-fountain-blue-200 underline text-xl">Login Now</Link>

          </label>
        </div>
        <div className="form-control mt-6 mb-2">
          <button 
          disabled = {userInfo.email === '' || userInfo.password === '' || userInfo.name === ''}
          
           onClick={
             handleFormSubmit
           }
          className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none
           
          ">Register</button>
        </div>

        <div className="form-control">
          <button className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none"
          
          onClick={handleGoogleSignIn}
          
          >
            <FaGoogle className="mr-2" /> 
          Sign In With Google</button>
        </div>
        
      </form>
    </div>
  </div>
</div>


</>
  )
}

export default SignUp