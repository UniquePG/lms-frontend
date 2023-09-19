import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";


const CourseDescription = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector( (state)=> state.auth)

    useEffect(()=>{
        console.log(state);
        console.log("roleee",role, data);
    })

  return (
    <HomeLayout>

    <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-gray-800">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
            <div className="space-y-5">
                <img src={state?.thumbnail?.secure_url}
                    alt="thumbnail" 
                    className="w-full h-64"
                    />

                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-between text-xl ">
                        <p className="font-semibold">
                            <span className="text-yellow-500 font-bold">
                                Total Lectures: {" "}
                            </span>
                            {state?.numbersOfLectures}
                        </p>   

                        <p className="font-semibold">
                            <span className="text-yellow-500 font-bold">
                               Instructor: {" "}
                            </span>
                            {state?.createdBy}
                        </p>   

                    </div>
                {
                    role === "ADMIN" || data?.subscription?.status == "ACTIVE" ? 
                    ( 
                        <button className="bg-yellow-600 text-xl font-bold rounded-md px-5 py-3 w-full hover:bg-yellow-500 ease-in-out duration-300 transition-all"> 
                            Watch Lectures
                        </button>
                    ) : (
                        <button onClick={()=> navigate("/checkout")} 
                            className="bg-yellow-500 text-xl font-bold rounded-md px-5 py-3 w-full hover:bg-yellow-600 ease-in-out duration-300 transition-all text-white">
                            Subscribe
                        </button>

                    )
                }


                </div>

            </div>
            
            <div className="space-y-2 text-xl">
                <h1 className="text-3xl text-yellow-500 mb-5 text-center">
                    {state?.title}
                </h1>

                <p className="text-yellow-500">Course Description</p>
                <p>{state?.description}</p>

            </div>


        </div>
        
    </div>
    </HomeLayout>
  )
}

export default CourseDescription