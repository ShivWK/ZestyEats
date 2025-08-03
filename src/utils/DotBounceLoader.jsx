const DotBounceLoader = () => {
    return <div>
      <p style={{ display: "flex", gap: "5px" }}>
        <span className='animate-dotBounce' style={{fontSize: "50px", animationDelay: "0s"}}>.</span>
        <span className='animate-dotBounce' style={{fontSize: "50px", animationDelay: "0.2s"}}>.</span>
        <span className='animate-dotBounce ' style={{fontSize: "50px", animationDelay: "0.4s"}}>.</span>
      </p>
    </div>
}

export default DotBounceLoader;