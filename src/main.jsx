import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Hyper2 from './components/Hyper2.jsx'
import Array2 from './components/Array2.jsx'

document.documentElement.classList.add('dark');

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
    element: <Array2 />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
