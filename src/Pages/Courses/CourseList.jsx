import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

const CourseList = () => {

    const dispatch = useDispatch();

    const {courseData} = useSelector( (state)=> state.course);

    async function loadCourses(){
        await dispatch(getAllCourses());

    }

    useEffect(()=>{
        loadCourses();  // load all courses on the first render
    },[])

  return (
   <HomeLayout>
  <div className=" m-auto flex items-center justify-center">
      <div className="min-h-[90vh] pt-32 pl-12 flex flex-col text-black gap-10">
        <h1 className="font-bold text-2xl text-center">
          Explore the courses made by <span className="font-bold text-yellow-500"> Industry Experts</span>
        </h1>

        <div className="mb-10 flex flex-wrap gap-14 ">
            {
              courseData?.map( (course)=> {
                return <CourseCard key={course._id} data={course} />
              })
            }
        </div>

      </div>
  </div>
   </HomeLayout>
  )
}

export default CourseList