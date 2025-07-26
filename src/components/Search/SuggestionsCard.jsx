import { useState } from "react";
import { Link } from "react-router-dom";

const SuggestionsCard = ({ imageUrl, item, path }) => {
    const [isError, setIsError] = useState(false);

    return <Link to={path} key={item?.cloudinaryId} className="flex gap-3 my-2 p-2 dark:hover:bg-gray-900 hover:bg-gray-200 rounded cursor-pointer border-[1px] border-gray-300 dark:bg-gray-600 mt-4">
        <img
            className="rounded"
            src={isError ? "/images/fallback.png" : imageUrl}
            alt="Image rendered"
            height={70}
            width={70}
            onError={() => setIsError(true)}
        />
        <div className="flex flex-col justify-center dark:text-gray-200">
            <p className="font-bold">{item?.text}</p>
            <p>{item?.tagToDisplay}</p>
        </div>
    </Link>
}

export default SuggestionsCard;

