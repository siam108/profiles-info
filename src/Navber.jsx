import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
NavLink
const Navber = () => {

  const navigate= useNavigate();

    const Links =
             <> <li><NavLink to="/"> All Entries</NavLink></li>
            <li><NavLink to="/new"> New Entry </NavLink></li>
             <li><NavLink to="/categories"> Categories</NavLink></li>
                  
        
        </>

      const handleLogout = () =>{
        sessionStorage.removeItem('log');
        navigate('/login')
      }
      


    return (
        <div className=" bg-base-300">
        <div className="navbar max-w-6xl mx-auto" >
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                 {Links}
                </ul>
              </div>
              <a className="btn md:w-auto btn-ghost md:text-left  md:text-xl w-28 text-sm">Profiles Information</a>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
               {Links}
              </ul>
            </div>
            <div className="navbar-end">
            <label className="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input type="checkbox" value="dracula" defaultChecked className="toggle theme-controller" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
                  <button className="hover:btn-error btn btn-info btn-sm ml-5" onClick={handleLogout}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796"   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  <span className="hidden md:block"> Log Out </span> 
                  </button>
            </div>
          </div>
    </div>
    );
};

export default Navber;


