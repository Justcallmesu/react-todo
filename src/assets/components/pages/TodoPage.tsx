// DESIGN
import { Layout } from 'antd';

import {useState,useEffect,BaseSyntheticEvent} from 'react'

import axios from "axios";

// Components
import Snackbar from "../base/Snackbar";
import TheHeader from '../layout/TheHeader';
import TodoCard from '../base/Todolist/TodoCard';
import { Plus } from 'react-bootstrap-icons';

export default function Todopage({username,categoryID}:{username:string,categoryID:string}){
    // Layout
    const {Content} = Layout
    // State
    const [todo,setTodo] = useState([]);
    const [todoField,setTodoField] = useState("");


    // MODAL
    const [isSnackbarShown, setIsSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [isError,setIsError] = useState(false)

    // General Function
    function resetSnackbarState(){
        setIsError(false)
        setSnackbarMessage("")
        setIsSnackbar(false)
    }
    
    async function GetTodo(){
        const {data:{data}} = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${categoryID||""}?isCompleted=false`,{withCredentials:true})
        setTodo(data);
    }

    useEffect(()=>{
        GetTodo();
    },[])


    // Build Elements
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

    // Handler
    function handleTextChange(e:BaseSyntheticEvent){
        setTodoField(e.target.value);
    }

    async function HandleSubmit(){
        if(!todoField){
            return;
        }

        try{
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}todo/${categoryID||""}`,
                {title:todoField},
                {withCredentials:true})

            setIsError(false)
            setSnackbarMessage("Todo Added")
            setIsSnackbar(true)
        }catch(error){
            setIsError(true)
            setSnackbarMessage("Post Fail to Added")
            setIsSnackbar(true)
        }
        GetTodo()
        setTodoField("")
    }

    // UseEffect
    useEffect(()=>{
        GetTodo()
    },[categoryID])

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
                        <header className='w-full py-2 px-5 flex gap-5'>
                            <input type="text" name="createTodo" className='TextField' placeholder='What is in your mind?' value={todoField} onChange={handleTextChange}/>
                            <button className='text-2xl bg-primary rounded-full p-2 text-white' onClick={HandleSubmit}><Plus/></button>
                        </header>
                        <section className="w-full min-h-full px-5 py-5 grid grid-cols-5 grid-rows-3 gap-5">
                            {
                                BuildTodo().length?
                                BuildTodo():
                                <h1>Test</h1>
                            }
                        </section>            
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}