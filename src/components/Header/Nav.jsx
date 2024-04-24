import { Link } from "react-router-dom"
import { useGoogleAuth } from "../../context/GoogleAuthProvider";
import { useLogin } from "../../context/LoginAuthProvider";


const Nav = () => {
  
  const {googleUser,googleSignOut} = useGoogleAuth();
  const {loginUser,logout} = useLogin()
  console.log("In nav google:",googleUser)
  console.log("In nav login : ",loginUser)
  

  return (
    <div className="navbar z-50 bg-fountain-blue-800 text-fountain-blue-50 sticky top-0 bg-opacity-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 glass">
      <div className="container mx-auto">

  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link>Login</Link>
          <Link>Item 2</Link>
         
        </li>
      </ul>
    </div>
    <Link className="btn btn-ghost text-3xl" to="/">TR | S
    
    <span className='relative mx-0 text-center'>O  <svg className='inline mb-2 mx-1 absolute top-[-12%] left-[-1%]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="150" height="50">
              <circle cx="10" cy="23" r="8" fill="white" stroke="black" strokeWidth="2" />
              <circle cx="10" cy="23" r="3" fill="black" />
              

              
  {/* <text x="20" y="37" font-family="Arial" font-size="1.875rem" line-height="2.25rem" fill="#F1F9FA" >KING</text> */}
            </svg>
         </span>
    NG</Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        googleUser || loginUser ?
        <>
          <li>
        <Link to="/" className="text-xl"
        onClick={()=>{
         user ? googleSignOut():logout()
        }}
        
         
        >Logout</Link>
        
      </li>

      <li>
        <Link to="/add-tune" className="text-xl"
       
        
         
        >Add Tune</Link>
        
      </li>
        </>
      

        :
        <li>
        <Link to="/signin" className="text-xl">Login</Link>
        
      </li> 
    
      }
      
      
      <li><Link className="text-xl">Item 3</Link></li>
    </ul>
  </div>
  </div>

 
</div>
  )
}

export default Nav