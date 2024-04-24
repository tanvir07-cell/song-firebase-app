import Nav from "../components/Header/Nav"
import LOGIN from "../assets/login.svg"
import { FaGoogle } from "react-icons/fa";
import { useGoogleAuth } from "../context/GoogleAuthProvider";
import { useLogin } from "../context/LoginAuthProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseInit } from "../firebase";
import { setDoc,doc, collection, onSnapshot, addDoc, getDoc } from "firebase/firestore";

const {auth,firestore} = firebaseInit()

const colRef = collection(firestore,"users")

const docRef= doc(colRef)












const Signin = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  
  })


  const {loginUser,login,handleLogin} = useLogin()
  const {handleGoogleUser,googleUser} = useGoogleAuth();





  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setUserInfo({
      ...userInfo,
      [name]:value
    })
  }


  const handleGoogleSignIn = (e)=>{
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((userCredential)=>{
      console.log("User : ",userCredential.user.uid)

      handleGoogleUser(userCredential.user)

      const existsDocRef = doc(colRef,userCredential.user.uid)

      getDoc(existsDocRef).
      then((docSnap)=>{
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



 const handleFormSubmit = (e)=>{
  e.preventDefault()
   signInWithEmailAndPassword(auth, userInfo.email, userInfo.password).
    then((userCredential)=>{
      const user = userCredential.user
      console.log("In login : ",user)
      handleLogin(user)
      navigate('/')
      toast.success("Login Successfull")
    })
    .catch((error)=>{

      if(error.code === "auth/user-not-found"){
        toast.error("User Not Found")
      }
      if(error.code === "auth/wrong-password"){
        toast.error("Wrong Password")
      }
      if(error.code === "auth/invalid-credential"){
        toast.error("Invalid Credential")
        
      }

      

      else{
        toast.error(error.message)
      }



    })


  console.log("In login : ",loginUser)


  
  
  
}

// when user signup then user will be redirected to login page
useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log("Signin User : ",user)
      setUserInfo({
        email:user.email,
        password:"",

      })
    }

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
          <label className="label" htmlFor="email">
            <span className="label-text text-fountain-blue-50">Email</span>
          </label>
          <input type="email" 
          name = "email"
          id = "email"
          onChange={handleInputChange}
          value={userInfo.email}
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
            value={userInfo.password}

          placeholder="password" className="input input-bordered bg-fountain-blue-900"  />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover text-fountain-blue-50">Forgot password?</a>
          </label>
          <label className="label">
          <span>Don't have any account?</span> 
            <Link to = "/register" className="label-text-alt link link-hover text-fountain-blue-200 underline text-xl">Register First</Link>

          </label>
        </div>
        <div className="form-control mt-6 mb-2">
          <button 
           onClick={
              handleFormSubmit

           }
          className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none"
          disabled={userInfo.email === '' || userInfo.password === ''}

          >Login</button>
        </div>

        <div className="form-control">
          <button className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none"
          
          onClick={
            handleGoogleSignIn
          }
          
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

export default Signin