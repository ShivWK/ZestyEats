
export default function Cards({ data }) {
    return <div className="inline-block border-2">
        <img 
            className="w-3xl h-32 rounded shrink-0"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${data.imageId}`} 
            alt={data.accessibility.altText} 
        />
    </div>
}