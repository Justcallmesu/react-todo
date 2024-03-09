// DESIGN
import { Layout } from 'antd';

import {useState,useEffect} from 'react'

import axios from "axios";

// Components
import Snackbar from "../base/Snackbar";
import { TodoCategory } from "../base/Todolist/TodoCategory";
import TheHeader from '../layout/TheHeader';

export default function Todopage({username}:{username:string}){
    // Layout
    const {Header,Content} = Layout

    // STATE
    const [category, setCategory] = useState([]);
    
    async function GetTodo(){
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}category`,{withCredentials:true})
        const {data:{data}} = response;

        setCategory(data);
    }

    useEffect(()=>{
        GetTodo()
    },[])



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
                <TheHeader username={username} GetTodo={GetTodo} snackbarCallback={{setSnackbarMessage,setIsError,setIsSnackbar}}/>
                <Content>
                    <section className="w-full min-h-full px-5 py-5 flex flex-col gap-5">
                        {
                            BuildCategory()
                        }
                    </section>            
                </Content>
            </main>
        </>
    )
}