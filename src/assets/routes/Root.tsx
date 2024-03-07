import { useLoaderData, useNavigate } from "react-router-dom"


export default function Root(){
    const userinfo = useLoaderData();

    console.log(userinfo);
    return(
        <>
            
        </>
    )
}