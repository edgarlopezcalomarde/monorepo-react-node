import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CameraProvider } from './components/ui/camera/camera-provider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CameraProvider>
      <App />
    </CameraProvider>
  </React.StrictMode>,
)
