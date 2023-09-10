
const CarausalSlide = ({image, title, description, pageNo, totalPage}) => {

  return (
<div id={`slide${pageNo}`}className="carousel-item relative w-full">
    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

        <img src={image} className="w-44 rounded-full border-2 border-gray-400" />

        <p className="text-xl text-gray-500">
            {description}
        </p>

        <h3 className="text-2xl font-semibold text-gray-600">{title}</h3>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${(pageNo == 1) ? totalPage : (pageNo - 1)}`} className="btn btn-circle">❮</a> 
        <a href={`#slide${(pageNo == totalPage) ? 1 : (pageNo + 1)}`} className="btn btn-circle">❯</a>
        </div>
    </div>
</div>
 
  );
}

export default CarausalSlide