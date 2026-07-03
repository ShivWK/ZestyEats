import { useState } from 'react';
import { Link } from 'react-router-dom';

const SuggestionsCard = ({ imageUrl, item, path }) => {
  const [isError, setIsError] = useState(false);

  return (
    <Link
      to={path}
      key={item?.cloudinaryId}
      className="my-2 mt-4 flex cursor-pointer gap-3 rounded border-[1px] border-gray-300 p-2 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-950"
    >
      <img
        className="rounded"
        src={isError ? '/images/fallback.png' : imageUrl}
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
  );
};

export default SuggestionsCard;
