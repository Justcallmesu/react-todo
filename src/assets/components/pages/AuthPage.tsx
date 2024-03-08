import {Outlet} from "react-router-dom"
import {BaseSyntheticEvent, useState} from "react"
import Modal from "../base/Modal"

export default function AuthPage(){
        const [isModalShown, setIsModal] = useState(false)
        const [modalMessage, setModalMessage] = useState("")
        const [modalCallback, setModalCallback] = useState(()=>{})
        const [isError,setIsError] = useState(false)

        function resetModalState(e:BaseSyntheticEvent){
            e.stopPropagation();
            setIsError(false)
            setModalMessage("")
            setIsModal(false)
            setModalCallback(()=>{})
        }

    return(
        <>  
        {
            isModalShown && 
            // Modal
            <Modal isError={isError} modalCallback={modalCallback} resetModalState={resetModalState} modalMessage={modalMessage}/>
        }
            
            <div className="flex flex-col lg:flex-row">
                <div className="w-full h-52 lg:h-screen bg-[#38b299] "></div>
                <Outlet context={[setIsModal,setIsError,setModalMessage,setModalCallback]}/>
            </div>
        </>
    );
}