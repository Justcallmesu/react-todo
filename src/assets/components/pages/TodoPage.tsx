import {Plus} from "react-bootstrap-icons"
import {useState,useEffect, BaseSyntheticEvent} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Snackbar from "../base/Snackbar";
import { TodoCategory } from "../base/Todolist/TodoCategory";

export default function Todopage({username}:{username:string}){
    // REDIRECT
    const navigate = useNavigate();

    // STATE
    const [category, setCategory] = useState([]);
    const [categoryField, setText] = useState("");
    
    async function GetTodo(){
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}category`,{withCredentials:true})
        const {data:{data}} = response;

        setCategory(data);
    }

    useEffect(()=>{
        GetTodo()
    },[])


    async function postTodo(){
        if(!categoryField){
            setIsError(true);
            setIsSnackbar(true);
            setSnackbarMessage("Category Cannot be Empty!");
            return;
        }

        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}category`,{title:categoryField},{withCredentials:true})
        GetTodo()
        setText("")

    }

    function HandleTodoField(e:BaseSyntheticEvent){
        setText(e.target.value)
    }

    async function HandleLogout(){
        await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,{withCredentials:true})
        return navigate("/auth/login")
    }

    // MODAL
    const [isSnackbarShown, setIsSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [isError,setIsError] = useState(false)

    function resetSnackbarState(){
        setIsError(false)
        setSnackbarMessage("")
        setIsSnackbar(false)
    }

    function BuildCategory(){
        const elements:Array<JSX.Element>=[];

        for (const data of category) {
            const {_id,title} = data;
            elements.push(<TodoCategory key={_id} title={title} categoryID={_id} snackbarCallback={{setSnackbarMessage,setIsError,setIsSnackbar}}/>)
        }
        return elements;
    }

    return(
        <>
            {
                isSnackbarShown && 
                // Modal
                <Snackbar message={snackbarMessage} isError={isError} resetState={resetSnackbarState}/>
            }
            <main className="w-full h-full shadow-2xl overflow-auto relative">
                <div className="sticky top-0">
                    <header className="bg-primary text-white flex justify-between items-center">
                        <p className="text-xl">Welcome Back! <span className="font-bold">{username}</span></p>
                        <button className="bg-white text-primary font-bold px-5 py-2 rounded-xl" onClick={HandleLogout}>Log Out</button>
                    </header>
                    <section className="w-full px-5 py-5 flex gap-5 bg-white">
                        <input type="text" name="" id="" className="TextField" placeholder="What in your mind ?" value={categoryField} onChange={HandleTodoField}/>
                        <button className="bg-primary text-white px-2 rounded-lg text-2xl" onClick={postTodo}>
                            <Plus/>
                        </button>
                    </section>
                </div>
                <section className="w-full min-h-full px-5 py-5 flex flex-col gap-5">
                    {
                        BuildCategory()
                    }
                </section>            
            </main>
        </>
    )
}