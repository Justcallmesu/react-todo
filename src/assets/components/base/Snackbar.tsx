import { Check, XCircleFill } from "react-bootstrap-icons";

export default function Snackbar({message,isError,resetState}:{message:string,isError:boolean,resetState:Function}){

    let timeout;

    function StyleGetter(){
        return isError?"bg-red-500":"bg-primary"
    }
    
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
        resetState()
    },2000)

    return(
        <div className="items-center bg-white fixed bottom-10 right-10 shadow-2xl w-1/3 flex gap-5 rounded-l-lg overflow-hidden z-10">
            <section className={`text-white text-3xl flex justify-center items-center ${StyleGetter()} p-2`}>
                {
                    isError?
                    <XCircleFill/>:
                    <Check/>

                }
            </section>
            <h3 className="text-xl">{message}</h3>
        </div>
    )
}