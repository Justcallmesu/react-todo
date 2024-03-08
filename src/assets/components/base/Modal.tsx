import {BaseSyntheticEvent, useState} from "react"
export default function Modal({isError,modalMessage,modalCallback,resetModalState}:{isError:boolean,modalMessage:string,modalCallback:void,resetModalState:Function}){

    return(
        <div className="w-screen h-screen bg-opacity-50 bg-gray-700 fixed left-0 top-0 z-10 flex justify-center items-center" onClick={(e)=>{resetModalState(e);modalCallback}}>
            <main className="w-4/5 h-2/3 rounded-lg lg:w-1/2 lg:h-1/2 bg-white px-5 py-5 flex flex-col">
                {
                    isError?
                    <h3 className="ModalTitle">Oops Something Wrong!</h3>:
                    <h3 className="ModalTitle">Hooray!</h3>
                }
                <hr className="mt-2 border-2 border-primary"/>
                <section className="w-full h-full mt-2">
                    <p className="text-xl">
                        {modalMessage}
                    </p>
                </section>
                <section className="flex justify-center">
                    <button className="bg-[#28b498] text-white px-10 py-2 rounded-lg" onClick={(e)=>{resetModalState(e);modalCallback}}>Okay</button>
                </section>
            </main>
        </div>
    )
}