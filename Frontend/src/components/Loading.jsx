import { VscLoading } from "react-icons/vsc";

const Loading = () => {
    return (
        <div className="w-full h-full grid justify-center items-center">    
                <VscLoading className="h-auto w-auto animate-spin text-gray-600 p-22"/>
        </div>
    )
}

export default Loading