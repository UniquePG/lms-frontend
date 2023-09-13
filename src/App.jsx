import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUs'
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


      {/* If any rount not exists Page not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    
  </>
  )
}

export default App
