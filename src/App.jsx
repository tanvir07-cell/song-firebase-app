import { Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import GoogleAuthProviderContext from "./context/GoogleAuthProvider"
import LoginAuthProvider from "./context/LoginAuthProvider"
import SignUp from "./pages/SignUp"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddTune from "./pages/AddTune"
import { Suspense, lazy } from "react"
import Loading from "./components/Loading"

const Home = lazy(()=>import("./pages/Home"))

const App = () => {
  return (
    <div className="text-white">

      <GoogleAuthProviderContext>
      <LoginAuthProvider>

      <Suspense fallback={<Loading/>}>

      <Routes>
        <Route path = "/" element = {<Home/>} />

        <Route path = "/signin" element = {<Signin/>} />
        <Route path = "/register" element = {<SignUp/>}/>
        <Route path = "/add-tune" element={<AddTune/>}/>

      </Routes>
      </Suspense>

      </LoginAuthProvider>


      </GoogleAuthProviderContext>
      
      <ToastContainer/>

      

    </div>
   
  )
}

export default App