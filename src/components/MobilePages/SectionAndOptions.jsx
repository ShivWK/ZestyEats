// Done
import { Link } from 'react-router-dom';

const SectionAndOptions = ({ section }) => {
  // console.log("SelectAndOptions rendered");

  return (
    <section className="w-full border-b-10 border-gray-300 bg-white dark:bg-gray-800">
      <div className="dark:bg-darkPrimary bg-primary w-full px-1.5 py-2 text-xl font-semibold text-white">
        <p>{section.heading}</p>
      </div>
      <div className="flex flex-col justify-center gap-2 p-1.5">
        {section.data.map((item, index) => (
          <Link
            key={index}
            className="flex items-center justify-between border-b-[1px] border-gray-300 pb-1 last:border-b-0"
            to={`/mbStaticData?type=Support${item.question === 'Contact Us' ? '&mode=form' : ''}`}
            state={{ data: item }}
          >
            <p className="dark:text-gray-200">{item.question}</p>
            <i className="ri-arrow-drop-right-line text-3xl font-extralight dark:text-gray-200" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionAndOptions;
