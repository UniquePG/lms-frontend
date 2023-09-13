import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { LogIn } from "../Redux/Slices/AuthSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    function showPasswordHandler(){

        setShowPassword((prevShowPassword) => !prevShowPassword);
    }


    // to handle signup data
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleInputData = (e)=> {
        const {name, value } = e.target;

        setLoginData({
            ...loginData,
            
            [name]:value 
        })
    }



    // now submit our form 
   async function onLogin(e){
        e.preventDefault();

        // validate input fields
        if(!loginData.email || !loginData.password ){
            toast.error("Please fill all the details!")
            return
        }



        // Now we make a form data object to pass our data to the server
        //* we can also avoid this and pass simple object to the backend server
            // const formData = new FormData();
            // formData.append("email", loginData.email);
            // formData.append("password", loginData.password);
        
        //! Here we will not use formData we directly pass the loginData obj.


        // dispatch our action
        const response = await dispatch(LogIn(loginData));
        console.log(response);

        if(response?.payload?.success)
            navigate("/")

        setLoginData({
            fullname: "",
            email: "",
            password: "",
            avatar: ""
        })


    }

  return (
    <HomeLayout>

        <div className="flex items-center justify-center h-[90vh]">

            <form noValidate onSubmit={onLogin} 
                className="flex flex-col justify-center gap-3 w-96  rounded-lg p-4 text-gray-700 border-2 border-gray-300 shadow-[0_0_7px_black] bg-white">

                <h1 className="text-3xl text-center font-bold p-2">Login to your account</h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email:</label>
                    <input type="email"
                        required
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputData}
                        value={loginData.email}
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
                        value={loginData.password}
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
                        Log In
                    </button>

                <p className="text-center">
                   Do not have an account ? <Link to="/signup" className=" text-accent font-semibold cursor-pointer">Signup</Link>
                </p>


            </form>

        </div>


    </HomeLayout>
  )
}

export default Login