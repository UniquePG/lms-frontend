import { useNavigate } from "react-router-dom";


const CourseCard = ({ data }) => {
  
  const navigate = useNavigate();


  return (
        // {state: {...data }}  send this data to the desc. page that is accessible by useLocation hook
    <div onClick={()=> navigate("/course/description", {state: {...data }}  )} 
      className="bg-transparent rounded-tl-2xl rounded-tr-2xl">
    <div className="card w-[26rem] glass m-auto h-fit bg-[#f5f6fa] max-h-[43rem]">
      <figure className="">
        <img
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
          className="group-hover:scale-[1,2] transition-all duration-150 min-h-[23rem] h-[25rem] w-full"
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
          <button className="btn text-white bg-[#487eb0] ">See Details</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseCard;
