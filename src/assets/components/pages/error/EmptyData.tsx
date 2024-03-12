import { BanFill } from "react-bootstrap-icons";

export default function EmptyData(){

    return (
        <div className="w-full flex flex-col gap-2 justify-center items-center">
            <BanFill className="text-red-600 text-3xl"/>
            <h1 className="font-bold">No Data Found</h1>
        </div>
    )
}