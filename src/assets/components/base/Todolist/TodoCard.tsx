import axios from "axios"
import { BaseSyntheticEvent, useRef } from "react"
import { Check, Pencil, Trash2Fill } from "react-bootstrap-icons"
import { useState } from "react"

export default function TodoCard(

    {
        // Todo Data
        title,date,isCompleted,_id,callback,categoryID,
        // Modal State
        setIsModal,setIsError,setModalMessage
    }:
    {
        // Todo Data
        title:string,date:string,isCompleted:boolean,_id:string,callback:Function,categoryID?:string
        
        // Modal State
        setIsModal:Function,setIsError:Function,setModalMessage:Function
    },
    
    ){

    const [isUpdate,setIsUpdate] = useState(false);
    const [scopedTitle,setScopedTitle] = useState(title);
    const textField:any = useRef();
    
    function ModalError(message:string="Somethings Wrong Try Again Later!"){
        setIsModal(true);
        setIsError(true);
        setModalMessage(message)
    }

    function ModalSuccess(message:string="Update Success!"){
        setIsModal(true);
        setModalMessage(message)
    }

    function HandleScopedChange(e:BaseSyntheticEvent){
        setScopedTitle(e.target.value)
    }


    async function HandleDelete(){
        try{
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${_id}`,{withCredentials:true})
            ModalSuccess("Todo Deleted")
            callback()
        }catch(error){
            ModalError()
        }
    }

    async function HandleUpdate(){
        setIsUpdate(true);
    }

    async function HandleFinish(){
        setIsUpdate(false)
        try{
            await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${_id}`,{title:scopedTitle},{withCredentials:true})
        }catch(error){
            ModalError()
        }
        callback()
    }

    return(
        <div className="w-full shadow-lg rounded-lg flex flex-col overflow-hidden">
            <header className="bg-primary px-5 py-2 flex justify-between items-center text-white">
                <div className="flex gap-5 items-center">
                    <div>
                        <h5 className="font-bold ">{date}</h5>
                        <h6 className={`${isCompleted? "text-red-600":"text-white"} font-bold`}>{isCompleted? "DONE":"TODO"}</h6>
                    </div>
                </div>
                <div className="flex gap-2">
                    {
                        isUpdate?
                        <button className="p-2 rounded-lg bg-white text-primary" onClick={HandleFinish}><Check/></button>:
                        <button className="p-2 rounded-lg bg-white text-primary" onClick={HandleUpdate}><Pencil/></button>
                    }
                    <button className="p-2 rounded-lg bg-red-600 text-white" onClick={HandleDelete}><Trash2Fill/></button>
                </div>
            </header>
            <section className="px-5 py-2 flex overflow-x-auto">
                {
                    isUpdate?
                    <input type="text" value={scopedTitle} onChange={HandleScopedChange} className="TextField" ref={textField}/>:
                    <h1>{title}</h1>
                }
            </section>
        </div>
    )
}