export default function Presente() {
    return (
        <div className="flex flex-col items-center w-fit relative">
            <div className="w-[100px] h-[25px] bg-green-500"></div>
            <div className="w-[90px] h-[60px] bg-green-700"></div>
            <div className="bg-red-600 w-[15px] h-[60px] absolute left-[50%] bottom-0" style={{ transform: 'translate(-50%)' }}></div>
            <div className="bg-red-600 w-[90px] h-[15px] absolute left-[50%] bottom-[30%]" style={{ transform: 'translate(-50%)' }}></div>
        </div>
    )
}