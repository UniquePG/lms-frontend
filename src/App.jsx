import './App.css'

import { Route, Routes } from 'react-router-dom'

import CourseCard from './Components/CourseCard'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import CourseList from './Pages/Courses/CourseList'
import Denied from './Pages/Denied'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'

function App() {

  return (
  <>
    <Routes>
      <Route path="/"  element={<Homepage />} />
      <Route path="/about"  element={<AboutUs />} />
      <Route path='/signup' element={<Signup />} /> 
      <Route path='/login' element={<Login />} /> 
      

      <Route path='/courses' element={<CourseList />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/card' element={<CourseCard />} /> 


    {/* if you not have access of a page */}
      <Route path='/denied' element={<Denied />} /> 

      {/* If any rount not exists Page not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    
  </>
  )
}

export default App
