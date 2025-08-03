const DotBounceLoader = () => {
    return <p className="flex gap-2 items-center -mb-1" >
        <span className='animate-dotBounce' style={{fontSize: "20px", animationDelay: "0s"}}>•</span>
        <span className='animate-dotBounce' style={{fontSize: "20px", animationDelay: "0.2s"}}>•</span>
        <span className='animate-dotBounce ' style={{fontSize: "20px", animationDelay: "0.4s"}}>•</span>
      </p>

}

export default DotBounceLoader;