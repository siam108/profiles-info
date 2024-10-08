import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} 
from "react-router-dom";
import "./index.css";
import Root from './Root';
import Error from './Error';
import Home from './Home';
import New from './New';
import Categories from './Categories';
import Details from './Details';
import Update from './Update';
import Login from './login';
import CategoryItems from './CategoryItems';
import Database from './database';
import UpdatePass from './UpdatePass';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement : <Error></Error>,
    children: [
      {
         path: "/",
         element: <Home></Home>
      },
      {
         path: "/new",
         element: <New></New>
      },
      {
         path: "/categories",
         element: <Categories></Categories>
      },
      {
         path: "/details/:id",
         element: <Details></Details>
      },
      {
         path: "/update/:id",
         element: <Update></Update>
      },
      {
         path: "/category-items/:id",
         element: <CategoryItems></CategoryItems>
      },
     
      {
         path: "/db",
         element: <Database></Database>
      },
     
    ]
  }, {
   path: "/login",
   element: <Login></Login>
},
{
   path: "/pass-update",
   element: <UpdatePass></UpdatePass>
},
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
