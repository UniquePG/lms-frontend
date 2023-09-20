import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { getUserDetails, updateProfile } from '../../Redux/Slices/AuthSlice';

const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const details = useSelector((state)=> state?.auth?.data)

    const [userData, setUserData] = useState({
        fullname: details?.fullname,
        previewImage:details?.avatar?.secure_url,
        avatar: undefined,
        userId: useSelector((state)=> state?.auth?.data?._id)
    });

    useEffect(()=> {
      dispatch(getUserDetails())
    },[])

    // function for handle image
    function handleImage(e){
        e.preventDefault();

        const uploadImage = e.target.files[0];

        if(uploadImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function (){
                setUserData({
                    ...userData,
                    previewImage: this.result,
                    avatar: uploadImage
                });
            });
        }
    }


    // handle form data
    function handleUserInput(e){
        
        const {name, value} = e.target;

        setUserData({
            ...userData,
            [name]: value
        })
    }

    // handle form submit
    async function handleSubmit(e){
        e.preventDefault();
        
        // validations
        if(!userData.fullname || !userData.avatar){
            toast.error("All filds are mendatory");
            return
        }

        if(userData.fullname.length < 5){
            toast.warning('Full name must be at least 5 characters');
            return;
        }

        // make form data
        const formData = new FormData();
        formData.append("fullname", userData.fullname)
        formData.append("avatar", userData.avatar)

        
        // now dispatch our thunk
        await dispatch(updateProfile([userData.userId, formData]));

        await dispatch(getUserDetails());

        navigate("/user/profile");

    }

  return (
<HomeLayout>
<div className="flex items-center justify-center h-[100vh] bg-gray-500">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

          {/* input for image file */}
          <label className="cursor-pointer" htmlFor="image_uploads">
            {userData.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={userData.previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="avatar"
            accept=".jpg, .jpeg, .png"
          />

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="fullname">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter your full name"
              className="bg-transparent px-2 py-1 border"
              value={userData.fullname}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

        </form>
      </div>
</HomeLayout>
  )
}

export default EditProfile