import { EyeFill,EyeSlashFill } from "react-bootstrap-icons"

import {Link, useNavigate, useOutletContext} from "react-router-dom"
import {useState} from 'react'
import axios, { AxiosError, AxiosResponse } from "axios"

export default function Login(){
    const navigate = useNavigate();

    const [isShown,setIsShown] = useState(false)

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const [setIsModal,setIsError,setModalMessage,setModalCallback] = useOutletContext() as any;

    function HandleUsernameChange(e:any){
        setUsername(e.target.value)
    }

    function HandlePasswordChange(e:any){
        setPassword(e.target.value)
    }

    async function HandleSubmit(){
        if(!username || !password){
            setModalMessage("All Data Field Are Not Filled! Please Fill The Required Field")
            setIsError(true)
            setIsModal(true)
        }
        try{
            const response:AxiosResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}auth/login`,{username,password},{headers:{"Content-Type":"application/json"},withCredentials:true})

            if(response.status === 201) {
                setModalMessage(`Welcome Back ${username}`)
                setIsError(true)
                setIsModal(true)
                setModalCallback(()=>navigate("/"))
            }
        }catch(error:any){
            console.log(error)
            const {response:{data:{message},status}} = error

            if(status === 400){
                setModalMessage(message)
                setIsError(true)
                setIsModal(true)
            }
        }
    }

    return(
        <div className="px-20 bg-white w-full flex flex-col gap-10 justify-center items-center py-5 lg:w-1/2 lg:h-screen">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-3xl">Login To Your Account</h1>
                <h2 className="mt-2">Enter Your Credentials</h2>
            </div>
            
            <section className="flex flex-col gap-5 w-full">
                <div className="w-full">
                    <input type="text" name="username" id="UsernameInput" className="TextField" placeholder="Username" value={username} onChange={HandleUsernameChange}/>
                </div>
                <div className="w-full">
                    <div className="relative">
                        <input type={isShown?"text":"password"} name="username" id="UsernameInput" className="TextField" placeholder="Password" value={password} onChange={HandlePasswordChange}/>
                        <button onClick={()=>{setIsShown(!isShown)}}>
                            {
                                isShown?
                                <EyeFill className="PasswordShow"/>:
                                <EyeSlashFill className="PasswordShow"/>
                            }
                            
                        </button>
                    </div>
                </div>
            </section>
            
            <button className="bg-[#28b498] text-white px-10 py-2 rounded-lg" onClick={HandleSubmit}>Login</button>
            <p>Dont have an Account? <Link to={"/auth/register"} className="text-primary font-semibold">Register</Link></p>

        </div>
    )
}