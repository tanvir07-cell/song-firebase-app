import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div className="navbar bg-fountain-blue-800 text-fountain-blue-50 sticky top-0 bg-opacity-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 glass">
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
    <Link className="btn btn-ghost text-xl" to="/">TR | SONG</Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/signin">Login</Link></li>
      
      <li><Link>Item 3</Link></li>
    </ul>
  </div>
 
</div>
  )
}

export default Nav