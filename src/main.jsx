import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothScroll from './components/common/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <SmoothScroll>
    <StrictMode>
        <App />
    </StrictMode>
  </SmoothScroll>
)