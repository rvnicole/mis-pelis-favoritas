import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router />
      <ToastContainer position="bottom-right" theme="colored"/>
  </StrictMode>,
)
