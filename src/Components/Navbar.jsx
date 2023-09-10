import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import profileImg from "../assets/default.png";

const Navbar = () => {

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
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>


      <div className="navbar-center">
  
        <a className="btn btn-ghost normal-case text-xl">StudyPulse</a>

      </div>


      <div className=" navbar-end ">

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
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>

        </div>
      </div>
      
    </div>
  );
};

export default Navbar;