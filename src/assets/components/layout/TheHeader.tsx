import {BoxArrowRight, GearFill, PersonFill} from "react-bootstrap-icons"

// ANTD
import {Layout,Dropdown} from 'antd'
import type { MenuProps } from "antd";

import {BaseSyntheticEvent, useState} from 'react';
import { Link } from "react-router-dom";

import axios from "axios"


export default function TheHeader({username,snackbarCallback,GetTodo}:{username:string,snackbarCallback:any,GetTodo:Function}){    
    // layout
    const {Header} = Layout;

    // Handler
    async function HandleLogout(){
        await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,{withCredentials:true})
    }

    // Dropdown Menu
    const items:MenuProps['items'] = [
        {
            label:(
                <Link to={"/auth/login"} onClick={HandleLogout} className="flex items-center gap-2">
                    <GearFill className="text-primary"/> Settings
                </Link>
            ),
            key:"settings"
        },
        {
            type:"divider"
        },
        {
        label:(
            <Link to={"/auth/login"} onClick={HandleLogout} className="flex items-center gap-2">
                <BoxArrowRight className="text-primary"/> Logout
            </Link>
        ),
        key:"logout"
    }]


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
        </Header>
    )
}
