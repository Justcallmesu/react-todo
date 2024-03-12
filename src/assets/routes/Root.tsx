import { useLoaderData, useParams } from "react-router-dom"


import TodoPage from "../components/pages/TodoPage"


export default function Root(){
    const {data:{data:{username}}}:any = useLoaderData();
    const {categoryID} = useParams();

    return(
        <div className="w-screen h-screen flex justify-center">
            <TodoPage username={username} categoryID={categoryID as string}></TodoPage>            
        </div>
    )
}