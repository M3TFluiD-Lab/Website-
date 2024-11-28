import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import './assets/style.css';
import { BrowserRouter } from 'react-router-dom';
// import './themeToggle';
// import './qualification';
// import './recentWorks';
// import './techSkills';
// import './headerTags';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
