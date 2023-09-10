import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUs'
import Homepage from './Pages/Homepage'
import NotFound from './Pages/NotFound'

function App() {

  return (
  <>
    <Routes>
      <Route path="/"  element={<Homepage />} />
      <Route path="/about"  element={<AboutUs />} />



      {/* If any rount not exists Page not found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    
  </>
  )
}

export default App
