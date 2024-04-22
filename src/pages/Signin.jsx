import Nav from "../components/Header/Nav"
import LOGIN from "../assets/login.svg"

const Signin = () => {
  return (
    <>
    <Nav/>
    
    <div className="hero min-h-screen bg-fountain-blue-600 text-fountain-blue-50">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={LOGIN} alt="" className="h-[100%] w-[100%]" />
   
    <div className="card shrink-0 w-full max-w-sm  bg-fountain-blue-700
    backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200
    ">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-fountain-blue-50">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-fountain-blue-50">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover text-fountain-blue-50">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>

</>
  )
}

export default Signin