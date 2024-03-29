import axios from "axios"
import {Pencil, Trash2Fill } from "react-bootstrap-icons"


export default function TodoCard(
    {
        // Todo Data
        title,date,isCompleted,_id,callback,
        // Modal State
        setIsSnackbar,setIsError,setSnackbarMessage,modalFunction
        
    }:
    {
        // Todo Data
        title:string,date:string,isCompleted:boolean,_id:string,callback:Function,categoryID?:string
        
        // Modal State
        setIsSnackbar:Function,setIsError:Function,setSnackbarMessage:Function, modalFunction:any
    }){

    // Modal
    const { setIsModal,setTargetId,setType} = modalFunction;
    
    function ModalError(message:string="Somethings Wrong Try Again Later!"){
        setIsSnackbar(true);
        setIsError(true);
        setSnackbarMessage(message)
    }

    function ModalSuccess(message:string="Update Success!"){
        setIsSnackbar(true);
        setSnackbarMessage(message)
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
        setIsModal(true)
        setType("todo")
        setTargetId(_id)
    }

    async function handleUpdateStatus(){
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${_id}`,{isCompleted:!isCompleted},{withCredentials:true});
        callback();
    }

    return(
        <div className="w-full shadow-lg rounded-lg flex flex-col overflow-hidden">
            <header className="bg-primary px-4 py-2 flex justify-between items-center text-white">
                <input type="checkbox" onChange={handleUpdateStatus} checked={isCompleted}/>
                <div className="flex gap-5 items-center">
                    <div>
                        <h5 className="font-bold ">{date}</h5>
                        <h6 className={`${isCompleted? "text-red-600":"text-white"} font-bold`}>{isCompleted? "DONE":"TODO"}</h6>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white text-primary" onClick={HandleUpdate}><Pencil/></button>
                    <button className="p-2 rounded-lg bg-red-600 text-white" onClick={HandleDelete}><Trash2Fill/></button>
                </div>
            </header>
            <section className="px-5 py-2 flex overflow-x-auto">
                <h1>{title}</h1>
            </section>
        </div>
    )
}