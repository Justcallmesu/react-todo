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


const router = createBrowserRouter([
  {
    path:"/",
    id:"root",
    element:<Root/>,
    loader:async ()=>{
          try{
            const data = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/userinfo`)
            return data;
        }catch(error){
            return redirect("auth/login")
        }
        }
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
        
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
