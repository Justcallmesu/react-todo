// DESIGN
import { Layout } from 'antd';

import {useState,useEffect} from 'react'

import axios from "axios";

// Components
import Snackbar from "../base/Snackbar";
import TheHeader from '../layout/TheHeader';
import TodoCard from '../base/Todolist/TodoCard';

export default function Todopage({username}:{username:string}){
    // Layout
    const {Content} = Layout

        const [todo,setTodo] = useState([]);

    // MODAL
    const [isSnackbarShown, setIsSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [isError,setIsError] = useState(false)

    function resetSnackbarState(){
        setIsError(false)
        setSnackbarMessage("")
        setIsSnackbar(false)
    }
    
    async function GetTodo(){
        const {data:{data}} = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}todo?isCompleted=false`,{withCredentials:true})
        setTodo(data);
    }

    useEffect(()=>{
        GetTodo();
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
            setIsModal={setIsSnackbar}
            setIsError={setIsError}
            setModalMessage={setSnackbarMessage}
            />
            )
        }
        return elements
    }

    // UseEffect
    useEffect(()=>{
        GetTodo()
    },[])


    return(
        <>
            {
                isSnackbarShown && 
                // Modal
                <Snackbar message={snackbarMessage} isError={isError} resetState={resetSnackbarState}/>
            }
            <Layout className="w-full h-full shadow-2xl overflow-auto relative">
                <Layout>
                    <TheHeader username={username} GetTodo={GetTodo} snackbarCallback={{setSnackbarMessage,setIsError,setIsSnackbar}}/>
                    <Content>
                        <section className="w-full min-h-full px-5 py-5 flex flex-col gap-5">
                            {
                                BuildTodo()
                            }
                        </section>            
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}