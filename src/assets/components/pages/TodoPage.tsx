// DESIGN
import { Dropdown, Layout, MenuProps } from 'antd';

import {useState,useEffect,BaseSyntheticEvent} from 'react'

import axios from "axios";

// Components
import Snackbar from "../base/Snackbar";
import TheHeader from '../layout/TheHeader';
import TodoCard from '../base/Todolist/TodoCard';
import { Check2, ClipboardCheckFill, FunnelFill, Plus } from 'react-bootstrap-icons';
import EmptyData from './error/EmptyData';
import Modal from '../base/Modal';

export default function Todopage({username,categoryID}:{username:string,categoryID:string}){
    // Layout
    const {Content} = Layout
    // State
    const [todo,setTodo] = useState([]);
    const [todoField,setTodoField] = useState("");
    const [filter,setFilter] = useState("");


    // Snackbar
    const [isSnackbarShown, setIsSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [isError,setIsError] = useState(false)

    // Modal
    const [isModalShown, setIsModal] = useState(false)
    const [modalCallback,setModalCallback] = useState(function():any{return;})
    const [targetId,setTargetId] = useState("");
    const [modalType,setType] = useState("todo");

    // Get Class
    function getClass(active:string){
        return active === filter && "text-primary"; 
    }

    // Menu
    const items:MenuProps['items'] = [{
        label:(
            <button className={`flex gap-3 items-centerw-full ${getClass("Done")}`} onClick={()=>handleFilter("Done")}>
                <Check2/>
                Done
            </button>
        ),
        key:"FilterDone"
    },
    {
        label:(
            <button className={`flex gap-3 items-centerw-full ${getClass("Todo")}`} onClick={()=>handleFilter("Todo")}>
                <ClipboardCheckFill/>
                Todo
            </button>
        ),
        key:"FilterDone"
    }
]

    // General Function
    function resetSnackbarState(){
        setIsError(false);
        setSnackbarMessage("");
        setIsSnackbar(false);
    }

    function resetModalSatate(){
        setIsModal(false);
        setModalCallback(()=>{});
        setTargetId("");
        setType("");
    }
    
    async function GetTodo(){
        let query = `&`;

        if(filter === "Done") query +="isCompleted=true"
        else if(filter === "Todo") query +="isCompleted=false"

        const {data:{data}} = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}todo?categoriesID=${categoryID||""}${query}`,{withCredentials:true})
        setTodo(data);
    }

    useEffect(()=>{
        GetTodo();
    },[isModalShown,filter])


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
            setIsSnackbar={setIsSnackbar}
            setIsError={setIsError}
            setSnackbarMessage={setSnackbarMessage}

            modalFunction={{isModalShown,setIsModal,setModalCallback,setTargetId,setType}}
            />
            )
        }
        return elements
    }

    // Handler
    function handleTextChange(e:BaseSyntheticEvent){
        setTodoField(e.target.value);
    }

    function handleFilter(type:string){
        if(type === filter) return setFilter("")
        setFilter(type);
    }

    async function HandleSubmit(){
        if(!todoField){
            return;
        }

        try{
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}todo?categoriesID=${categoryID||""}`,
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
            {
                isModalShown&&
                <Modal 
                modalCallback={modalCallback}
                resetModalState={resetModalSatate}
                id={targetId}
                type={modalType}
                snackbarFunction={{setIsSnackbar,setSnackbarMessage,setIsError}}
                />
            }
                <Layout className="w-full h-full shadow-2xl overflow-auto relative">
                <Layout>
                    <TheHeader
                    username={username}
                    snackbarCallback={{setSnackbarMessage,setIsError,setIsSnackbar}}
                    modalFunction={{isModalShown,setIsModal,setModalCallback,setTargetId,setType}}
                    />
                    <Content>
                        <header className='w-full py-2 px-5 flex gap-5'>
                            <input type="text" name="createTodo" className='TextField' placeholder='What is in your mind?' value={todoField} onChange={handleTextChange}/>
                            <button className='text-2xl bg-primary rounded-full p-2 text-white' onClick={HandleSubmit}><Plus/></button>
                            <Dropdown menu={{items}} arrow={true} placement='bottomRight'>
                                <button className='text-2xl bg-primary rounded-full p-2 text-white' onClick={HandleSubmit}><FunnelFill/></button>
                            </Dropdown>
                        </header>
                        {
                            BuildTodo().length?
                            <section className="w-full min-h-full px-5 py-5 grid grid-cols-5 grid-rows-3 gap-5">
                            {
                                BuildTodo()
                            }
                            </section>:
                            <EmptyData/>   
                        }
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}