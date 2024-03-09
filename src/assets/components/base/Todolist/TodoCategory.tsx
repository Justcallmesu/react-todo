import {useState,useEffect} from 'react';

// Components
import TodoCard from "./TodoCard";
import axios from 'axios';

export function TodoCategory({categoryID,title,snackbarCallback}:{categoryID:string,title:string,snackbarCallback:any}){

    const {setIsSnackbar,setIsError,setSnackbarMessage} = snackbarCallback;

    const [todo,setTodo] = useState([]);
    
    async function GetTodo(){
        const {data:{data}} = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${categoryID}`,{withCredentials:true})
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
            categoryID={categoryID}

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

    return (
        <main className="w-full flex flex-col gap-2">
            <header>
                <h1 className="text-2xl text-primary font-bold">{title}</h1>
                <hr className="border-2 rounded-lg"/>
            </header>
            <section className="flex flex=col">
                {BuildTodo()}
            </section>
        </main>
    )
}