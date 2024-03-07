import { EyeFill,EyeSlashFill } from "react-bootstrap-icons"

import {Link, useNavigate, useOutletContext} from "react-router-dom"
import {useState} from 'react'
import { ThreeDots } from "react-loader-spinner"
import axios from "axios"

export default function Register(){
    const navigate = useNavigate();

    const [isShown,setIsShown] = useState(false)

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirm] = useState("")
    const [isLoading,setLoading] = useState(false)

    // Outlet props
    const [setIsModal,setIsError,setModalMessage,setModalCallback] = useOutletContext() as any;


    function HandleUsernameChange(e:any){
        setUsername(e.target.value)
    }

    function HandlePasswordChange(e:any){
        setPassword(e.target.value)
    }

    function HandleConfirmPasswordChange(e:any){
        setConfirm(e.target.value)
    }

    async function HandleSubmit(){
        if(!username || !password || !confirmPassword){
            setModalMessage("All Data Field Are Not Filled! Please Fill The Required Field")
            setIsError(true)
            setIsModal(true)
        }

        if(password !== confirmPassword){
            setModalMessage("Password and Confirm Password Doesn't Match")
            setIsError(true)
            setIsModal(true)
        }
        try{
            setLoading(true)
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}auth/register`,{username,password,confirmPassword},
            {headers:{"Content-Type":"application/json"},withCredentials:true})
            setModalMessage("Account Created")
            setIsModal(true)

            setModalCallback(function():any{navigate("/auth/login")})
        }catch(error:any){
            if(error.response.status === 409){
                setModalMessage("Username Already Taken")
                setIsError(true)
                setIsModal(true)
            }
        }
        setLoading(false)
    }

    return(
        <div className="px-20 bg-white w-full flex flex-col gap-10 justify-center items-center py-5 lg:w-1/2 lg:h-screen">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-3xl">Create Your Account</h1>
                <h2 className="mt-2">Fill All Data</h2>
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
                <div className="w-full">
                    <div className="relative">
                        <input type={isShown?"text":"password"} name="username" id="UsernameInput" className="TextField" placeholder="Confirm Password" value={confirmPassword} onChange={HandleConfirmPasswordChange}/>
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
            
            <button className="bg-[#28b498] text-white px-10 py-2 rounded-lg" disabled={isLoading} onClick={HandleSubmit}>
                {
                    isLoading?
                    <ThreeDots
                    visible={true}
                    color="#ffff"
                    width="20px"
                    height="20px"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />:
                    "Register"
                }
            </button>
            <p>Already have an Account? <Link to={"/auth/login"} className="text-primary font-semibold">Login</Link></p>

        </div>
    )
}