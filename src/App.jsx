import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import GoogleAuthProviderContext from "./context/GoogleAuthProvider"
const App = () => {
  return (
    <div className="text-white">
      <GoogleAuthProviderContext>

      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/signin" element = {<Signin/>} />

      </Routes>
      </GoogleAuthProviderContext>

    </div>
   
  )
}

export default App