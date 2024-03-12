import ReactDOM from 'react-dom/client'
import './index.css'

import axios from "axios"


// Router DOM
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom"

// Pages
import Root from "./assets/routes/Root"
import Login from "./assets/routes/Login"
import AuthPage from './assets/components/pages/AuthPage'
import Register from './assets/routes/Register'


const router = createBrowserRouter([
  {
    path:"/:categoryID?",
    id:"root",
    element:<Root/>,
    loader:async ()=>{
          try{
            const data = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/userinfo`,{withCredentials:true})
            return data;
        }catch(error){
          return redirect("auth/login")
        }
    },
  },
  {
    path:"/auth",
    id:"auth",
    element:<AuthPage/>,
    children:[
      {
        path:"/auth/login",
        id:"login",
        element: <Login/>,
        
      },
      {
        path:"/auth/register",
        id:"register",
        element: <Register/>,
        
      },
    ]
  },
  {
    path:"*",
    loader:()=>{
      return redirect("/")
    }
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
