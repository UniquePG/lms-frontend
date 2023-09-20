import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user is logged in
    // const isLoggedIn = useSelector( (state)=> state?.auth?.isLoggedIn);
    const {isLoggedIn, role, data} = useSelector( (state)=> state?.auth);

    // for displaying options acc to the role
    // const role = useSelector( (state)=> state?.auth?.role)

    // const user = useSelector( (state)=> state?.auth?.data)
    console.log("navbar", role, "\n", data);
    // console.log("navbar login", typeof(isLoggedIn), isLoggedIn);


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

        const res = await dispatch(logout())

        if(res?.payload?.success)
        navigate("/")


      }


    // make sticky navbar
const [navbarBackground, setNavbarBackground] = useState("transparent");

useEffect(() => {
  // Add a scroll event listener to change the navbar background color on scroll
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setNavbarBackground("bg-primary"); // Change to your desired background color
    } else {
      setNavbarBackground("transparent");
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);



  return (
  // <div className="">
    <div className={`navbar ${navbarBackground} fixed top-0 items-center transition-all duration-300 ease-in-out z-10  bg-base-100 justify-between `}>

    <div className=" navbar-start drawer  ml-6">
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

          <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-[90vh]">
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

                <li className="absolute -bottom-10 w-[90%] ">
                    <div className="w-full flex items-center justify-between space-x-1">
                        <button className="btn-primary w-full px-4 py-1 font-semibold rounded-md">
                            <Link to="/login"> Login </Link>
                        </button>

                        <button className="btn-secondary w-full  px-4 py-1 font-semibold rounded-md">
                            <Link to="/signup"> Signup </Link>
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
  
        <a className="btn btn-ghost normal-case text-4xl" href="/">StudyPulse</a>

      </div>


      <div className=" navbar-end mr-10">

    {
        !isLoggedIn ? (         
                    //! Register button if user is not logged in
            <Link className="flex items-center relative right-auto" to="/signup">
                <button className="bg-primary px-4 py-2 rounded-md text-white font-semibold hover:bg-primary-focus transition-all duration-200">
                    Register/Login
                </button>
            </Link>

        ) :
                //! Profile image if use is logged in
        (
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img src={data?.avatar?.secure_url} />
                {/* <img src={} /> */}
              </div>
            </label>
  
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className=" pl-3">
                <p className="text-yellow-500 text-lg font-medium flex flex-row gap-x-4">Hey! 
                  <span className="text-black text-xl capitalize font-semibold">  {data.fullname}</span>
              </p>
                {/* <p className="text-xl mr-3">{data.fullname}</p> */}
              </div>
              <li>
                <Link className="justify-between" to="/user/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
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
  // </div>
  );
};

export default Navbar;
