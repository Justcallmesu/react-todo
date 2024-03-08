import {Plus} from "react-bootstrap-icons"
import {useState,useEffect, BaseSyntheticEvent} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Modal from "../base/Modal";
import TodoCard from "../base/Todolist/TodoCard";

export default function Todopage({username}:{username:string}){
    // REDIRECT
    const navigate = useNavigate();

    // STATE
    const [todo, setTodo] = useState([]);
    const [todoField, setText] = useState("");
    
    async function GetTodo(){
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}todo`,{withCredentials:true})
        const {data:{data}} = response;

        setTodo(data);
    }

    useEffect(()=>{
        GetTodo()
    },[])

    function BuildTodo():Array<JSX.Element>{
        const elements:Array<JSX.Element> = []
        for(const data of todo){
            const {title,isCompleted,DatePosted,_id} = data;
            elements.push(<TodoCard 
            title={title} 
            date={new Date(DatePosted).toLocaleDateString("en-EN",{year:"numeric",month:"long",day:"2-digit"})} 
            _id={_id}
            callback={GetTodo}
            key={_id}
            isCompleted={isCompleted}
            setIsModal={setIsModal}
            setIsError={setIsError}
            setModalMessage={setModalMessage}
            />
            )
        }
        return elements
    }

    async function postTodo(){
        if(!todoField){
            setIsError(true);
            setIsModal(true);
            setModalMessage("Todo Cannot be Empty!");
            return;
        }

        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}todo`,{title:todoField},{withCredentials:true})
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
            <main className="w-1/2 h-full rounded-lg shadow-2xl overflow-auto">
                <div className="sticky top-0">
                    <header className="bg-primary px-5 py-5 text-white flex justify-between items-center">
                        <p className="text-xl">Welcome Back! <span className="font-bold">{username}</span></p>
                        <button className="bg-white text-primary font-bold px-5 py-2 rounded-xl" onClick={HandleLogout}>Log Out</button>
                    </header>
                    <section className="w-full px-5 py-5 flex gap-5 bg-white">
                        <input type="text" name="" id="" className="TextField" placeholder="What in your mind ?" value={todoField} onChange={HandleTodoField}/>
                        <button className="bg-primary text-white px-2 rounded-lg text-2xl" onClick={postTodo}>
                            <Plus/>
                        </button>
                    </section>
                </div>
                <section className="w-full min-h-full px-5 py-5 flex flex-col gap-5">
                    {
                        BuildTodo()
                    }
                </section>            
            </main>
        </>
    )
}