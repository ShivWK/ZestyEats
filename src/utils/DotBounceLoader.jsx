const DotBounceLoader = () => {
    return <p className="flex gap-1.5 items-center -mb-1" >
        <span className='animate-dotBounce text-white' style={{fontSize: "20px", animationDelay: "0s"}}>•</span>
        <span className='animate-dotBounce text-white' style={{fontSize: "20px", animationDelay: "0.2s"}}>•</span>
        <span className='animate-dotBounce text-white' style={{fontSize: "20px", animationDelay: "0.4s"}}>•</span>
      </p>

}

export default DotBounceLoader;