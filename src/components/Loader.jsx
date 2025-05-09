const Loader = ({ size }) => {
    return (
        size === "large" ?
            (<div className="w-full h-[400px] bg-gray-950 flex justify-center items-center">
                <div className="main-large"></div> 
            </div>)
            : (<div className="main-small"></div>)
    )

}

export default Loader;

