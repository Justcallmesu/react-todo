import axios from "axios";
import {useState,useEffect,BaseSyntheticEvent} from "react";

export default function Modal({modalCallback,resetModalState,id,type="todo",snackbarFunction}:{modalCallback:any,resetModalState:Function,id:string,type:string,snackbarFunction:any}){

    const [titleText,setTitleText] = useState("");
    const [categories,setCategories] = useState([]);
    const [selected,setSelected] = useState("");
    
    // Use Context
    const {setIsSnackbar,setSnackbarMessage,setIsError} = snackbarFunction;

    // API Handler
    async function getCategories(){
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}category`,{withCredentials:true})
        try{
            const {data:{data}} = response;
            setCategories(data);
        }catch(error){
            
        }
    }

    // Elements Builder
    function buildSelect(){
        const elements:Array<JSX.Element>=[]

        categories.forEach((value)=>{
            const {title,_id} = value;
            elements.push(
                <option value={_id} key={_id} aria-description={_id}>
                    {title}
                </option>
            )
        })
        return elements;
    }

    // Event Handler
    function handleSelectOnChange(e:BaseSyntheticEvent){
        setSelected(e.target.value);
    }

    function handleTextOnChange(e:BaseSyntheticEvent){
        setTitleText(e.target.value);
    }

    async function handleTodo(){
        if(!titleText || !selected){
            setIsError(true)
            setSnackbarMessage("Fill The Required Field!")
            setIsSnackbar(true);
            return
        }

        const data = {title:titleText,categoriesID:selected};

        if(id){
            await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}todo/${id}`,data,{withCredentials:true});
            await modalCallback;
            resetModalState()
            
            setSnackbarMessage("Todo Updated")
            setIsSnackbar(true);

            return;
        }
    }

    async function handleCategory(){
        if(!titleText){
            setIsError(true)
            setSnackbarMessage("Fill The Required Field!")
            setIsSnackbar(true);
            return
        }

        const data = {title:titleText};

        if(id){
            await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}category/${id}`,data,{withCredentials:true});
            resetModalState()
            
            setSnackbarMessage("Category Updated")
            setIsSnackbar(true);
            await modalCallback;
            return;
        }

        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}category`,data,{withCredentials:true});
        
        setSnackbarMessage("Category Posted")
        setIsSnackbar(true);

        await modalCallback;
        resetModalState();
    }

    useEffect(()=>{
        getCategories();
    },[])

    return(
        <div className="w-screen h-screen bg-opacity-50 bg-gray-700 fixed left-0 top-0 z-10 flex justify-center items-center">
            <main className="w-4/5  rounded-lg lg:w-1/2  bg-white px-5 py-5 flex flex-col">
                    <section className="flex flex-col gap-5">
                        {
                            type === "todo"?
                            <>
                                <div>
                                    <h1 className="text-xl font-bold">Todo List</h1>
                                    <hr />
                                </div>
                                <div>
                                    <h1>Title</h1>
                                    <input type="text" name="title" id="title" className="TextField" value={titleText} onChange={handleTextOnChange}/>
                                </div>
                                <div>
                                    <h1>Categories</h1>
                                    <select name="categories" id="categories" className="TextField" value={selected}
                                    onChange={handleSelectOnChange}>
                                        <option disabled value="" hidden>Select Categories</option>
                                        <option value="">None</option>
                                        {
                                            buildSelect()
                                        }
                                    </select>
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    <h1 className="text-xl font-bold">Categories</h1>
                                    <hr />
                                </div>
                                <div>
                                    <h1>Title</h1>
                                    <input type="text" name="title" id="title" className="TextField" value={titleText} onChange={handleTextOnChange}/>
                                </div>
                            </>
                        }
                    </section>


                <section className="flex gap-5 pt-5">
                    <button className="bg-red-500 text-white px-5 py-1 rounded-full"
                        onClick={()=>{
                            resetModalState();
                        }}
                    >
                        Cancel
                    </button>
                    <button className="bg-primary text-white px-5 py-1 rounded-full"
                        onClick={()=>{
                            if(type === "todo") return handleTodo();
                            handleCategory();
                        }}
                    >Confirm</button>
                </section>
            </main>
        </div>
    )
}