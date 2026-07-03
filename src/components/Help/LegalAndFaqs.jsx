// Done

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFaqs } from '../../features/home/helpPageSlice';
import { legal, faqs } from '../../utils/helpAndSupportData';

const LegalAndFaqs = () => {
  console.log('LegalAndFaqs rendered');
  const [activeIndex, setActiveIndex] = useState(0);
  const faqsStatus = useSelector(selectFaqs);

  const handleClick = (index) => {
    if (activeIndex === null) {
      setActiveIndex(index);
    } else if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const data = faqsStatus ? faqs : legal;
  const heading = faqsStatus ? 'FAQs' : 'Legal';

  return (
    <div className="basis-[75%] py-7 pl-7">
      <p className="mb-4 text-[28px] font-bold tracking-tight text-black dark:text-white">
        {heading}
      </p>
      {data.map((obj, index) => {
        return (
          <div key={index} className="border-b-2 border-gray-300">
            <div
              onClick={() => handleClick(index)}
              className={`group flex cursor-pointer items-center justify-between px-3 py-3 ${activeIndex === index ? 'bg-[rgba(255,81,0,0.15)]' : 'bg-white hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500'}`}
            >
              <h2
                className={`text-[18px] font-medium text-gray-800 transition-all duration-100 ease-in select-none ${activeIndex === index ? 'dark:text-primary' : 'group-hover:text-primary dark:text-black'}`}
              >
                {obj.question}
              </h2>
              <i
                className={`ri-arrow-drop-down-line ${activeIndex === index ? 'dark:text-primary' : 'group-hover:text-primary text-gray-800'} -ml-2.5 inline-block text-4xl font-[200]`}
                style={{
                  transform:
                    activeIndex === index ? 'rotate(-180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s linear',
                }}
              ></i>
            </div>
            <div
              className="p-3 py-5"
              style={{
                display: activeIndex === index ? 'block' : 'none',
              }}
            >
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {obj.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LegalAndFaqs;
