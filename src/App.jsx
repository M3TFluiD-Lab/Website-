import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import Publications from './pages/Publications'
import Lab from './pages/Lab'
import Repositories from './pages/Repositories'
import Teaching from './pages/Teaching'
import Team from './pages/Team'
import Services from './pages/Services'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/projects" exact element={<Projects />} />
        <Route path="/publications" exact element={<Publications />} />
        <Route path="/lab" exact element={<Lab />} />
        <Route path="/repositories" exact element={<Repositories />} />
        <Route path="/teaching" exact element={<Teaching />} />
        <Route path="/team" exact element={<Team />} />
        <Route path="/services" exact element={<Services />} />
      </Routes>
    </>
  )
}

export default App
