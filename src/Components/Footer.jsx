import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

const Footer = () => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <footer className="bg-blue-900 text-white py-6 relative left-0 bottom-0 px-3">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="order-2 lg:order-1 mb-4 lg:mb-0">
              <h2 className="text-2xl font-semibold mb-2">StudyPulse</h2>
              <p className="text-gray-400">Unlocking Knowledge, Empowering Minds</p>
            </div>
            <div className="order-1 lg:order-2 mb-4 lg:mb-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="text-white hover:text-gray-400 transition duration-300">Home</a>
                </li>
                <li>
                  <a href="/courses" className="text-white hover:text-gray-400 transition duration-300">Courses</a>
                </li>
                <li>
                  <a href="/about" className="text-white hover:text-gray-400 transition duration-300">About Us</a>
                </li>
                <li>
                  <a href="contact" className="text-white hover:text-gray-400 transition duration-300">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="order-3">
              <ul className="flex space-x-4 gap-3 text-2xl">
                <li>
                  <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                    <BsFacebook />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <BsLinkedin />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <BsTwitter />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <BsInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-4">
            &copy; {year} Your Learning Management System. All rights reserved.
          </div>
        </footer>
      );



}

export default Footer



//   return (
//     <>
//         <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row sm:px-20 items-center justify-between bg-gray-800 text-white'>
//             <section className='text-lg'> 
//                 Copyright {year} || All rights Reserved
//             </section>

//             <section className='flex items-center justify-center gap-5 text-2xl text-white'>

//                 <a className='hover:text-yellow-500 transition-all duration-300 ease-in-out'>
//                     <BsFacebook />
//                 </a>

//                 <a className='hover:text-yellow-500 transition-all duration-300 ease-in-out'>
//                     <BsInstagram />
//                 </a>

//                 <a className='hover:text-yellow-500 transition-all duration-300 ease-in-out'>
//                     <BsLinkedin />
//                 </a>

//                 <a className='hover:text-yellow-500 transition-all duration-300 ease-in-out'>
//                     <BsTwitter />
//                 </a>


//             </section>
//         </footer>
//     </>
//   )