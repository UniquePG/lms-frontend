import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createNewCourse } from "../../Redux/Slices/CourseSlice";

const CreateCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description:"",
        thumbnail: null,
        previewImage: ""
    })

    function handleImageUpload(e){
        e.preventDefault();

        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);

            fileReader.addEventListener("load", function () {
                
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            })
        }
    }
    

    function handleUserInput(e){

        const {name, value} = e.target;

        setUserInput({
            ...userInput,

            [name]: value
        })
    }

    
    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail) {
            toast.error("All fields are mendatory")
            return
        }

        const response = await dispatch(createNewCourse(userInput));

        if(response?.payload?.success){
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description:"",
                thumbnail: null,
                previewImage: ""
            });

            navigate("/courses")
        }

    }

  return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-600">
            <form
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                <Link to="/course/dashboard" className="absolute top-8 text-2xl link text-accent cursor-pointer">
                    <AiOutlineArrowLeft />
                </Link>

                <h1 className="text-center text-2xl font-bold">
                    Create New Course
                </h1>

                {/* Main content of form */}
                <main className="grid grid-cols-2 gap-x-10">
                    <div className="space-y-6">

                        {/* Course thumbnail */}
                        <div>
                            <label htmlFor="image_uploads" className="cursor-pointer">
                                {
                                    userInput.previewImage ? (

                                        <img src={userInput.previewImage} 
                                            alt="preview image"
                                            className="w-full h-44 m-auto border"
                                            />

                                    ) : (

                                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">
                                                Upload your course thumbnail
                                            </h1>
                                    </div>
                                )
                                }
                            </label>

                            <input onChange={handleImageUpload}
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    />

                        </div>

                        {/* Course Title */}
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-semibold" htmlFor="title">
                                Course Title
                            </label>
                            <input
                                required
                                type="name"
                                name="title"
                                id="title"
                                placeholder="Enter the course title"
                                className="bg-transparent px-2 py-1 border"
                                value={userInput.title}
                                onChange={handleUserInput}
                            />
                        </div>
                    </div>


            {/* adding the course description */}
            <div className="flex flex-col gap-1">
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              {/* adding the category */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

                <div className="flex flex-col gap-1">
                    <label className="text-lg font-semibold" htmlFor="description">
                        Course Description
                    </label>
                    <textarea
                        required
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Enter the course description"
                        className="bg-transparent px-2 py-1 border h-24  resize-none"
                        value={userInput.description}
                        onChange={handleUserInput}
                    />
                </div>
            </div>

                </main>

                <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    type="submit"
                    > 
                    Create Course
                </button>

            </form>
        </div>   
  )
}

export default CreateCourse