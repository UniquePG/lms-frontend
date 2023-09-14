import { useNavigate } from "react-router-dom";


const CourseCard = ({ data }) => {
  
  const navigate = useNavigate();


  return (
    <div onClick={()=> navigate("/course/description")} 
      className="bg-gray-500 rounded-tl-2xl rounded-tr-2xl">
    <div className="card w-[26rem] glass m-auto ">
      <figure>
        <img
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
          className="group-hover:scale-[1,2] transition-all duration-150"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold line-clamp-2">
            {data?.title}
        </h2>
        <p className="line-clamp-2"> 
          {data?.description}
        </p>
        <p>
          <span className="text-yellow-500 font-semibold">Category: </span>
          {data?.category}
        </p>
        <p>
          <span className="text-yellow-500 font-semibold">Total Lectures: </span>
          {data?.numbersOfLectures}
        </p>
        <p>
          <span className="text-yellow-500 font-semibold">Instructor: </span>
          {data?.createdBy}
        </p>


        <div className="card-actions justify-end flex flex-row ">
          <button className="btn btn-primary">See Details</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseCard;
