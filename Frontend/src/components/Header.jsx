const Header = () => {
    return (
    <>
    <div className="h-20 w-full bg-blue-900 grid grid-cols-2">
        <div className="h-full flex justify-start items-center pl-5">
            <p className="text-white text-2xl font-bold "> Course.io </p>
        </div>
        
        <div className="h-full flex justify-end items-center pr-5">
            <p className="text-white text-2xl font-bold "> Your Courses </p>
        </div>
        
    </div>
    </>
    )
}
export default Header