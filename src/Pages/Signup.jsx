import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillEyeFill, BsFillEyeSlashFill, BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, validatePassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImg, setPreviewImg] = useState("");

    const [showPassword, setShowPassword] = useState(false);


    function showPasswordHandler(){

        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    

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
        if( !isEmail(signupData.email))
        {
            toast.error("Invalid email address!")
            return
        }

        // password validation
        if( !validatePassword(signupData.password)){
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
                className="flex flex-col justify-center gap-3 w-96 mt-20 rounded-lg p-4 text-gray-700 border-2 border-gray-300 shadow-[0_0_7px_black] bg-white">

                <h1 className="text-3xl text-center font-bold  ">Register Yourself</h1>

                <label htmlFor="image_uploads" className="cursor-pointer flex justify-center items-center border rounded-full border-gray-400 w-24 h-24 mx-auto  hover:bg-gray-100">
                    {
                        previewImg ? (
                            
                            <img className="w-24 h-24 rounded-full " src={previewImg} />

                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full text-gray-400" />
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
                        className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputData}
                        value={signupData.email}
                        />
                </div>

                <div className="flex flex-col gap-1 relative">
                    <label htmlFor="password" className="font-semibold">Password:</label>
                    <input type={ showPassword ? `text` : `password`  }
                        required
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputData}
                        value={signupData.password}
                        />

                        <span className={`absolute top-10 right-3  cursor-pointer ${ showPassword ? 'hidden' : 'block' }`} 
                            onClick={showPasswordHandler} >
                                 
                            <BsFillEyeSlashFill size={22} className="text-gray-500" id="close" /> 
                        </span> 

                        <span className={`absolute top-10 right-3  cursor-pointer ${ showPassword ? 'block' : 'hidden' }`}
                                onClick={showPasswordHandler} >

                            <BsFillEyeFill size={22} className="text-gray-500" id="open" /> 
                        </span>
                </div>


                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-lg text-lg my-2 transition-all duration-300"
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