import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Hyper2 from './components/Hyper2.jsx'
import Hyper from './components/Hyper.jsx'
import Step2 from './components/Step2.jsx'
import { TopBar } from './components/TopBar.jsx'
import { Array } from './components/Array.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/step-1',
    element: <Hyper2 />,
  },
  {
    path: '/step-2',
    element: <Array />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
