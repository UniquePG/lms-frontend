import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/auth/RequireAuth'
import CourseCard from './Components/CourseCard'
import AboutUs from './Pages/AboutUs'
import CreateCourse from './Pages/Admin/CreateCourse'
import ContactUs from './Pages/ContactUs'
import CourseDescription from './Pages/Courses/CourseDescription'
import CourseList from './Pages/Courses/CourseList'
import AddLectures from './Pages/Dashboard/AddLectures'
import Displaylectures from './Pages/Dashboard/Displaylectures'
import Denied from './Pages/Denied'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import Checkout from './Pages/Payment/Checkout'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import Signup from './Pages/Signup'
import EditProfile from './Pages/User/EditProfile'
import Profile from './Pages/User/Profile'

function App() {

  return (
  <>
    <Routes>
      <Route path="/"  element={<Homepage />} />
      <Route path="/about"  element={<AboutUs />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/signup' element={<Signup />} /> 
      <Route path='/login' element={<Login />} /> 
      

      <Route path='/courses' element={<CourseList />} />
      <Route path='/card' element={<CourseCard />} /> 
      <Route path='/course/description' element={<CourseDescription />} />

      {/* Admin routes  */}
      {/* first all routed go the RequireAuth component and verify role */}
      <Route element={<RequireAuth  allowedRoles={["ADMIN"]} /> } >
        <Route path='/course/create' element={<CreateCourse />} />
        <Route path='/course/addlecture' element={<AddLectures />} />
      </Route>

        {/* Routes for user can acces after login */}
      <Route element={<RequireAuth  allowedRoles={["ADMIN", "USER"]} /> } >
        <Route path='/user/profile' element={<Profile /> } />
        <Route path='/user/editprofile' element={<EditProfile /> } />
        <Route path='/checkout' element={<Checkout /> } />
        <Route path='/checkout/success' element={<CheckoutSuccess /> } />
        <Route path='/checkout/fail' element={<CheckoutFail /> } />
        <Route path='/course/display-lectures' element={<Displaylectures /> } />
      </Route>

    {/* if you not have access of a page */}
      <Route path='/denied' element={<Denied />} /> 

      {/* If any rount not exists Page not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    
  </>
  )
}

export default App
