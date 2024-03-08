import { useLoaderData } from "react-router-dom"


import TodoPage from "../components/pages/TodoPage"


export default function Root(){
    const {data:{data:{username}}}:any = useLoaderData();

    return(
        <div className="w-screen h-screen py-5 flex justify-center">
            <TodoPage username={username}></TodoPage>            
        </div>
    )
}