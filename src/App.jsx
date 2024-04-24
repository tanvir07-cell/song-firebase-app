import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import GoogleAuthProviderContext from "./context/GoogleAuthProvider"
import LoginAuthProvider from "./context/LoginAuthProvider"
import SignUp from "./pages/SignUp"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddTune from "./pages/AddTune"
const App = () => {
  return (
    <div className="text-white">

      <GoogleAuthProviderContext>
      <LoginAuthProvider>


      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/signin" element = {<Signin/>} />
        <Route path = "/register" element = {<SignUp/>}/>
        <Route path = "/add-tune" element={<AddTune/>}/>

      </Routes>
      </LoginAuthProvider>


      </GoogleAuthProviderContext>
      
      <ToastContainer/>

      

    </div>
   
  )
}

export default App