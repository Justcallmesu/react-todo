import {Outlet} from "react-router-dom"
import {useState} from "react"

export default function AuthPage(){
        const [isModalShown, setIsModal] = useState(false)
        const [modalMessage, setModalMessage] = useState("")
        const [modalCallback, setModalCallback] = useState(()=>{})
        const [isError,setIsError] = useState(false)

    return(
        <>  
            
            <div className="flex flex-col lg:flex-row">
                <div className="w-full h-52 lg:h-screen bg-[#38b299] "></div>
                <Outlet context={[setIsModal,setIsError,setModalMessage,setModalCallback]}/>
            </div>
        </>
    );
}