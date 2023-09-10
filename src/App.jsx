import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUs'
import Homepage from './Pages/Homepage'

function App() {

  return (
  <>
    <Routes>
      <Route path="/"  element={<Homepage />} />
      <Route path="/about"  element={<AboutUs />} />


    </Routes>
    
  </>
  )
}

export default App
