import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
import App from './App.jsx'
import { ToastProvider } from './components/toasts/ToastManager.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
)
