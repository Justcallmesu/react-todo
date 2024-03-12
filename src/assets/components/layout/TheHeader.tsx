import {BoxArrowRight, PencilFill, PersonFill, PlusLg, ThreeDotsVertical, Trash2Fill} from "react-bootstrap-icons"

// ANTD
import {Layout,Dropdown} from 'antd'
import type { MenuProps } from "antd";

import { useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";

import axios from "axios"


export default function TheHeader({username,snackbarCallback,GetTodo,modalFunction}:{username:string,snackbarCallback:any,GetTodo:Function,modalFunction:any}){    
    // Modal
    const {isModalShown, setIsModal,setModalCallback,setTargetId,setType} = modalFunction;
    const {setIsSnackbar,setSnackbarMessage,setIsError} = snackbarCallback
    // layout
    const {Header} = Layout;

    // State
    const [categories,setCategories] = useState([]);

    // Handler
    async function HandleLogout(){
        await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,{withCredentials:true})
    }

    async function HandleDeleteCategory(id:string){
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}category/${id}`,{withCredentials:true});
        setSnackbarMessage("Category Deleted")
        setIsSnackbar(true);
        GetCategory();
    }

    function handleAddCategory(){
        setIsModal(true);
        setModalCallback(GetCategory)
        setType("categories")
    }

    function handleUpdateCategory(id:string){
        console.log(id);
        setIsModal(true);
        setModalCallback(GetCategory)
        setType("categories")
        setTargetId(id)
    }

    // Get API
    async function GetCategory(){
        try{
            const {data:{data}} = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}category`,{withCredentials:true});
            setCategories(data);
        }catch(error){
            console.error(error);
        }
    }


    // Dropdown Menu
    const items:MenuProps['items'] = [
        {
        label:(
            <NavLink to={"/auth/login"} onClick={HandleLogout} className="flex items-center gap-2">
                <BoxArrowRight className="text-primary"/> Logout
            </NavLink>
        ),
        key:"logout"
    }]

    function buildDropDownItems(categoryID:string){
        const items:MenuProps['items'] = [
        {
            label:(
                <button className="flex items-center gap-2 w-full" onClick={()=>handleUpdateCategory(categoryID)}>
                    <PencilFill className="text-primary"/> Edit
                </button>
            ),
            key:"Edit"
        },
        {
            type:"divider"
        },
        {
        label:(
            <button className="flex items-center gap-2 w-full" onClick={()=>HandleDeleteCategory(categoryID)}>
                <Trash2Fill className="text-red-600"/> Delete
            </button>
        ),
        key:"Delete"
    }]

    return {items};   
    }

    // BUILD ELEMENTS
    function buildCategoryNavLink(){
        const elements:Array<JSX.Element>=[
                <li>
                    <NavLink to={'/'} key="root"
                        className={({isActive}) => [
                            isActive?"current-page":"",
                        ].join(" ")
                    }
                    >All</NavLink>
                </li>,
        ];

        for(const data of categories){
            const {_id,title} = data
            elements.push(
                <li key={_id} className="flex gap-2 items-center">
                    <NavLink to={`/${_id}`} 
                        className={({isActive}) => [
                            isActive?"current-page":"",
                        ].join(" ")
                    }
                    >{title}</NavLink>
                    <Dropdown menu={buildDropDownItems(_id)} arrow={true} placement="bottomRight">
                        <ThreeDotsVertical className="cursor-pointer"/>
                    </Dropdown>
                </li>)
        }

        return elements;
    }

    useEffect(()=>{
        GetCategory();
    },[isModalShown])

    return(
        <Header className="sticky top-0 w-full h-fit p-0 bg-primary flex flex-col items-center shadow-md">
            <main className="px-5 py-5 w-full flex justify-between items-center">
                <p className="text-2xl text-white">Hello <span className="font-bold">{username}</span> !</p>
                <section>
                    <Dropdown trigger={["click","hover"]} menu={{items}} arrow={true} placement="topRight">
                        <div className="p-3 bg-white text-primary text-xl cursor-pointer rounded-full">
                            <PersonFill/>
                        </div>
                    </Dropdown>
                </section>
            </main>
            <nav className="w-full px-5 border-t-2 border-white">
                <ol className="py-2 flex items-center gap-5 text-xl font-semibold text-white">
                    {
                        buildCategoryNavLink()
                    }
                    <li >
                        <button className="flex items-center" onClick={handleAddCategory}>
                            <PlusLg/>
                        </button>
                    </li>
                </ol>
            </nav>
        </Header>
    )
}
