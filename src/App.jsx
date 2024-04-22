import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
const App = () => {
  return (
    <div className="text-white">
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/signin" element = {<Signin/>} />

      </Routes>
    </div>
   
  )
}

export default App