import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LecturesSlice";

const AddLectures = () => {

    const courseDetails = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""

    });

    function handleInputChange(e){
        const {name, value} = e.target;

        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    function handleVideo(e){
        const video = e.target.files[0];

        // now convert our video file into url form
        const source = window.URL.createObjectURL(video);

        console.log("source: ", source);
        setUserInput({
            ...userInput,

            lecture: video,
            videoSrc :source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault()

        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error("All fields are mandatory")
            return
        }

        const res = await dispatch(addCourseLecture(userInput))

        if(res?.payload?.success){
            navigate(-1)
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
        
            })
        }

    }

    useEffect(()=>{
        if(!courseDetails) navigate("/courses")
    },[])

  return (
<HomeLayout>
    <div className="min-h-[90vh] flex flex-col text-white items-center justify-center gap-10 mx-16">
    <div className="flex flex-col gap-5 p-3 shadow-[0_0_10px_black] w-[24rem] rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add your new lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Enter the title for lecture"
              className="bg-transparent px-3 py-1 border"
            />

            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Enter the description for lecture"
              className="resize-none  h-24 bg-transparent px-3 py-1 border"
            />
            {userInput.videoSrc ? (
            <div className="relative">
              <video
                src={userInput.videoSrc}
                muted
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>

              <span 
                className="absolute z-50 top-1 right-0 font-bold text-3xl cursor-pointer" 
                onClick={()=> setUserInput({ ...userInput, videoSrc: ""})}>
                     <MdCancel /> 
              </span>
            </div>
              
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-xl cursor-pointer"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={handleVideo}
                  accept="video/mp4,video/x-m4v,video/*"
                  className="hidden"
                />
              </div>
            )}

            <button className="btn-primary py-1 font-semibold text-lg rounded-lg">
              Add Lecture
            </button>
          </form>
        </div>
    </div>
</HomeLayout>
    )
}

export default AddLectures