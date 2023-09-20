import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserDetails } from "../../Redux/Slices/AuthSlice"
import { unsubscibeCourseBundle } from "../../Redux/Slices/RazorpaySlice"

const Profile = () => {

    const userData = useSelector((state)=> state?.auth?.data)
    console.log("profile page userdata", userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onUnsubscribe(){

      await dispatch(unsubscibeCourseBundle());
      await dispatch(getUserDetails());

      navigate("/user/profile")

      // toast.success("Unsubscribe successfully!")

    }

    useEffect(()=>{
      dispatch(getUserDetails());
    },[])

  return (
    <HomeLayout>
              <div className="min-h-[90vh] flex items-center justify-center bg-gray-400">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url}
            alt="user profile image"
          />

          <h3 className="text-2xl font-semibold text-center capitalize">
            {userData.fullname}
          </h3>

          <div className="grid grid-cols-2 m-auto">
            <p>Email :</p>
            <p>{userData?.email}</p>

            <p>Role :</p>
            <p>{userData?.role}</p>

            <p>Subscription :</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>

            { userData?.subscription?.status === "active" && 
              <> 
                  <p>Validity :</p>
                  <p> 1 Year</p>
              </>
            }

          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>

  
          </div>

          {userData?.subscription?.status === "active" && (
            <button onClick={()=> onUnsubscribe()}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile