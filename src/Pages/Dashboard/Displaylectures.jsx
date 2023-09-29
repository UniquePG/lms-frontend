import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LecturesSlice";

const Displaylectures = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {state } = useLocation();
    const {lectures} = useSelector((state)=> state.lecture)
    const {role} = useSelector((state)=> state.auth)

    // maintain state for current video index
    const [currentVideoIndex, setCurentVideoIndex] = useState(0)

// delete lecture
     async function onDeleteLecture (courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({courseId, lectureId}));

        // now again fetch lectues
        await dispatch(getCourseLectures(courseId))
     }


    useEffect(()=>{
        console.log("lectures...",state);

        if(!state) navigate("/courses");    

        dispatch(getCourseLectures(state._id))
    },[])

  return (
    <HomeLayout>
        <div className="flex flex-col gap-10 justify-center items-center min-h-[90vh] py-10 text-white mx-[5%]">
            <h1 className="text-center text-2xl font-semibold text-yellow-500">
            Course Name : {state?.title}
            </h1>

            { (lectures && lectures.length > 0) ? (<div className="flex justify-center w-full gap-10">
                {/* Left section for playing video and displaying course details to admin */}
                <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
                        controls
                        disablePictureInPicture
                        muted
                        controlsList="nodownload"
                    >

                    </video>

                    <div>
                        <h1>
                            <span className="text-yellow-500">Title: {" "}</span>
                            {lectures && lectures[currentVideoIndex]?.title}
                        </h1>

                        <p className="line-clamp-3">
                            <span className="text-yellow-500">Description: {" "}</span>
                            {lectures && lectures[currentVideoIndex]?.description}
                        </p>
                    </div>
                </div>

                {/* Right section */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                    <p> 
                        Lectures List
                    </p>
                {
                    role === "ADMIN" && (
                        <button onClick={()=> navigate("/course/addlecture", {state: {...state}})}  
                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                            Add new lecture
                        </button>
                    )
                }

                </li>

                { lectures && lectures.map( (lecture, idx)=> (

                    <li key={lecture._id} className="space-y-2"> 
                        <p onClick={()=> setCurentVideoIndex(idx)} className="cursor-pointer">

                            <span className="text-yellow-500">
                                {" "} Lecture {idx + 1}: {" "}
                            </span>
                            {lecture.title}
                        </p>

                {
                    role === "ADMIN" && (
                        <button onClick={()=> onDeleteLecture(state._id, lecture._id)} className="btn-accent    px-2 py-1 rounded-md font-semibold text-sm">
                            Delete lecture
                        </button>
                    )
                }
                    </li>
                ) )

                }
            </ul>


            </div>) : 
            (   <>
                <div className="text-3xl font-bold text-yellow-500">
                    No lectures found...
                </div>

                {role === "ADMIN" && (
                        <button onClick={()=> navigate("/course/addlecture", {state: {...state}})}  
                            className="btn-primary px-2 py-1 rounded-md font-semibold text-lg">
                            Add new lecture
                        </button>
                    )}
                </>
            ) }
        </div>
    </HomeLayout>
  )
}

export default Displaylectures