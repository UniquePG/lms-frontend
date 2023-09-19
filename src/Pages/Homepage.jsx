
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import homeImg from "../assets/home1.png"
import HomeLayout from '../Layouts/HomeLayout'

const Homepage = () => {

    const data = useSelector((state) => state?.auth?.data)
    console.log(data);

  return (
        <HomeLayout>

            <div className='pt-10 text-black flex items-center justify-center gap-10 mx-16 h-[90vh] '>
                <div className='w-1/2 space-y-6'>
                    <h1 className='text-5xl font-semibold '>
                        Find out best 
                        <span className='text-yellow-500 font-bold ml-2'>
                            Online Courses
                        </span>
                    </h1>

                    <p className='text-xl text-gray-600'>
                        We have a large library of courses tought by highly skilled and qualified faculties at very affordable cost
                    </p>

                    <div className='space-x-6'>
                        <Link to='/courses'>
                            <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-white cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in-out' > Explore Courses </button>
                        </Link>

                        <Link to='/contact'>
                            <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-white cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in-out' > Contact Us </button>
                        </Link>

                    </div>

                </div>


                <div className='w-1/2 flex items-center justify-center '>
                    <img src={homeImg} alt='homeimg' />
                </div>

            </div>

        </HomeLayout>

  )
}

export default Homepage