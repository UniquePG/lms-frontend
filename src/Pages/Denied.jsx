import { useNavigate } from "react-router-dom";

const Denied = () => {

    const navigate = useNavigate();

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold tracking-widest text-white">
            403
        </h1>

        <div className="bg-black text-white text-sm rounded rotate-12 absolute">
            Access Denied
        </div>

        <button className="mt-5" 
                onClick={()=> navigate(-1)} >
            <span className="px-8 py-2 bg-[#1A2238] relative border border-current text-white">
                Go Back
            </span>
        </button>
        
    </main>
  )
}

export default Denied