import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from "./routes/index.jsx"
import AuthProvider from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* semua route boleh menggunakan context AuthProvider */}
    <AuthProvider>
    {/* RouterProvider : pembungkus element untuk memunculkan element sesuai path yg diminta, router= : memberikan daftar routing yang ada di routes/index.jsx */}
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
