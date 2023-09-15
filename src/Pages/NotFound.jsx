import notfoundImg from "../assets/sad.png"

const NotFound = () => {
  return (

   
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        {/* <div className="w-1/2"> */}

        <img
        src={notfoundImg}
        alt="Not Found"
        className="w-48 h-48 mb-8 opacity-80"
      />
          <h1 className="text-9xl font-bold text-gray-700 mb-4 tracking-widest ">404</h1>

          <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go Back Home
          </a>

        {/* </div> */}

        {/* <div className="w-1/2">
        <img src={notfoundImg} alt="not found" width={}/>

        </div> */}
        </div>
      );

}

export default NotFound



//     <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
//     <img
//       src={notfoundImg}
//       alt="Not Found"
//       className="w-48 h-48 mb-8 opacity-80"
//     />
//     <div className="text-center text-white">
//       <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
//       <p className="text-2xl text-gray-100 mb-8">Oops! Page not found.</p>
//       <a
//         href="/"
//         className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-xl hover:opacity-90 transition duration-300 ease-in-out"
//       >
//         Go Back Home
//       </a>
//     </div>
//   </div>