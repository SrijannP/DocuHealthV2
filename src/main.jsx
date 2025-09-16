import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PatientProfile from './Pages/PatientProfile.jsx'
import Register from './Pages/Register.jsx'
import PatientRecord from './Pages/PatientRecord.jsx'
import Home from './Pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // path: '/'
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile/:patientId',
        element: <PatientProfile />
      },
      { path: "record", element: <PatientRecord /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
