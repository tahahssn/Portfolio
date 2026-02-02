import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothScrolling from './components/common/SmoothScrolling.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SmoothScrolling> */}
      <App />
    {/* </SmoothScrolling> */}
  </StrictMode>,
)
