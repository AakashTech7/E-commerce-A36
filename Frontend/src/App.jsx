import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
   <>
   <AuthProvider>
      <RouterProvider  router={router}/>
    </AuthProvider>
   </>
  )
}

export default App
