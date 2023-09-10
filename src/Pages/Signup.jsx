import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImg, setPreviewImg] = useState("");

    // to handle signup data
    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        avatar: ""
    })

    const handleInputData = (e)=> {
        const {name, value } = e.target;

        setSignupData({
            ...signupData,
            
            [name]:value 
        })
    }


    // handle uploaded image
    function getImage(event){

        event.preventDefault();

        // get the uploaded image
        const uploadedImg = event.target.files[0];

        if(uploadedImg){

            setSignupData({
                ...signupData,

                avatar: uploadedImg
            });

            //make file reader object
            const fileReader = new FileReader();

            // read the file as data (base64 formate)
            fileReader.readAsDataURL(uploadedImg);

            // then preview image on the screen using load event
            fileReader.addEventListener("load", function (){

                // console.log("file uploaded",this.result);
                setPreviewImg(this.result); // set preview image to preview on signup form
            })

        }
    }


    // now submit our form 
   async function createNewAccount(e){
        e.preventDefault();

        // validate input fields
        if(!signupData.fullname || !signupData.email || !signupData.password || !signupData.avatar){
            toast.error("Please fill all the details!")
            return
        }

        // checking name field length
        if(signupData.fullname.length < 5){
            toast.error("Name should be atleast 5 characters")
            return
        }

        // email validation
        if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
            toast.error("Invalid email address!")
            return
        }

        // password validation
        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6 to 16 characters long with atleast a number and a special character")
            return;
        }


        // Now we make a form data object to pass our data to the server
        //* we can also avoid this and pass simple object to the backend server
        const formData = new FormData();
        formData.append("fullname", signupData.fullname);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);


        // dispatch our action
        const response = await dispatch(createAccount(formData));
        console.log(response);

        if(response?.payload?.success)
            navigate("/")

        setSignupData({
            fullname: "",
            email: "",
            password: "",
            avatar: ""
        })

        setPreviewImg("")



    }

  return (
    <HomeLayout>

        <div className="flex items-center justify-center h-[90vh]">

            <form noValidate onSubmit={createNewAccount} 
                className="flex flex-col justify-center gap-3 w-96  rounded-lg p-4 text-gray-700 border-2 border-gray-300 shadow-[0_0_7px_black]">

                <h1 className="text-2xl text-center font-bold  ">Register Your Self</h1>

                <label htmlFor="image_uploads" className="cursor-pointer">
                    {
                        previewImg ? (
                            
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImg} />

                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )
                    }
                </label>

                <input type="file"
                    className="hidden"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png, .svg"
                    onChange={getImage}
                />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullname" className="font-semibold">Full Name:</label>
                    <input type="text"
                        required
                        name="fullname"
                        id="fullname"
                        placeholder="Enter your full name"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleInputData}
                        value={signupData.fullname}
                        />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email:</label>
                    <input type="email"
                        required
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleInputData}
                        value={signupData.email}
                        />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">Password:</label>
                    <input type="password"
                        required
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleInputData}
                        value={signupData.password}
                        />
                </div>


                    <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm py-2 font-semibold my-2 text-lg cursor-pointer "
                        type="submit"
                    >
                        Create Account
                    </button>

                <p className="text-center">
                    Already have an account ? <Link to="/login" className=" text-accent font-semibold cursor-pointer">Login</Link>
                </p>


            </form>

        </div>


    </HomeLayout>
  )
}

export default Signup