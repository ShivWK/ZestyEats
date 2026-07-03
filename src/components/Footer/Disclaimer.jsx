// Done

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  // console.log("Disclaimer rendered");
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mt-4 w-full bg-red-200 pb-16 dark:bg-[rgb(87,16,16)] dark:text-gray-100">
      <div className="w-full p-2 md:mx-auto md:max-w-[1210px]">
        <div className="mb-2 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation text-xl text-red-500 dark:text-yellow-300"></i>
          <p className="text-xl font-semibold">Educational Use Disclaimer</p>
        </div>
        <p className="text-justify font-sans">
          This project is for learning and demo purposes only. It does not
          represent or affiliate with any real-world brand. No commercial use
          intended. If you have concerns, please{' '}
          <Link
            to={isSmall ? '/mbStaticData?type=Support&mode=form' : '/help'}
            state={{ data: { title: 'Contact Us' } }}
            className="font-semibold text-blue-700 underline dark:text-blue-500"
          >
            contact
          </Link>{' '}
          for prompt removal.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
