import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import profileImg from "../assets/default.png";

const Navbar = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user is logged in
    const isLoggedIn = useSelector( (state)=> state?.auth?.isLoggedIn);

    // for displaying options acc to the role
    const role = useSelector( (state)=> state?.auth?.role)



    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
      }
    
      function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
    
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0";
      }
    

      async function handleLogout(e) {
        e.preventDefault()

        // const res = await dispatch(logout())

        // if(res?.payload?.success)

        navigate("/")


      }


  return (
    <div className="navbar bg-base-100 justify-between">

    <div className=" navbar-start drawer  ">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />

        <div className="drawer-content ">
          <label htmlFor="my-drawer" className="relative cursor-pointer ">
            <FiMenu
              onClick={changeWidth}
              size={"34px"}
              className="font-bold m-4 text-black"
            />
          </label>


        </div>

        <div className="drawer-side">   
        {/* bg-base-200 in class of my-drawer */}
          <label htmlFor="my-drawer" className="bg-base-200"></label>

          <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button className="" onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>

        {
            isLoggedIn && role === "ADMIN" && (
            <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>   
            )
        }

            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>

            {
                !isLoggedIn && (

                <li className="absolute bottom-2 w-[90%] ">
                    <div className="w-full flex items-center justify-between space-x-1">
                        <button className="btn-primary w-full px-4 py-1 font-semibold rounded-md">
                            <Link to="/login"> Login </Link>
                        </button>

                        <button className="btn-secondary w-full  px-4 py-1 font-semibold rounded-md">
                            <Link to="/login"> Signup </Link>
                        </button>
                    </div>
                </li>
                )
            }

            {
                isLoggedIn && (

                <li className="absolute bottom-2 w-[90%] ">
                    <div className="w-full flex items-center justify-between space-x-1">
                        <button className="btn-primary w-full px-4 py-1 font-semibold rounded-md">
                            <Link to="/user/profile"> Profile </Link>
                        </button>

                        <button className="btn-secondary w-full  px-4 py-1 font-semibold rounded-md">
                            <Link onClick={handleLogout}> Logout </Link>
                        </button>
                    </div>
                </li>
                )
            }


          </ul>
        </div>
      </div>


      <div className="navbar-center">
  
        <a className="btn btn-ghost normal-case text-xl">StudyPulse</a>

      </div>


      <div className=" navbar-end ">

    {
        !isLoggedIn ? (         
                    //! Register button if user is not logged in
            <Link className="flex items-center relative right-auto" to="/user/signup">
                <button className="bg-primary px-4 py-2 rounded-md text-white font-semibold hover:bg-primary-focus transition-all duration-200">
                    Register/Login
                </button>
            </Link>

        ) :
                //! Profile image if use is logged in
        (
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profileImg} />
              </div>
            </label>
  
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between" to="/user/profile">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
  
            </div>
        )
    }
    




      </div>
      
    </div>
  );
};

export default Navbar;
