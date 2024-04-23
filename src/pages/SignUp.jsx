import Nav from "../components/Header/Nav"
import LOGIN from "../assets/login.svg"
import { FaGoogle } from "react-icons/fa";
import { useGoogleAuth } from "../context/GoogleAuthProvider";
import { useLogin } from "../context/LoginAuthProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseInit } from "../firebase";

const {auth} = firebaseInit()




const SignUp = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name:'',
  
  })

  const {googleSignIn} = useGoogleAuth();

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,userInfo.email,userInfo.password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log("Create User : ",user)
      navigate('/signin')
      
      toast.success("User Created Successfully")

    })
    .catch((error)=>{
      toast.error(error.message)
    })
  }


  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setUserInfo({
      ...userInfo,
      [name]:value
    })
  }

  

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
          
          onClick={(e)=>{
            e.preventDefault()
            googleSignIn()


            
          }}
          
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