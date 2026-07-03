// Done
import { Link, useSearchParams } from 'react-router-dom';
import { mobileHelpLegalFaqs } from '../../utils/helpAndSupportData';
import { about } from '../../utils/aboutPageData';
import SectionAndOptions from './SectionAndOptions';
import MobileFooterMenu from '../Footer/MobileFooterMenu';

const OptionsPage = () => {
  // console.log("MobilePages/OptionsPages rendered");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <main
      className={`w-full bg-[rgb(55,113,142)] px-1.5 pt-16 pb-20 dark:bg-black ${mode === 'about' && 'h-full'}`}
    >
      {mode === 'about' ? (
        <div className="mt-4 flex h-fit flex-col justify-start gap-2 rounded-md bg-white p-2 font-medium text-gray-700 dark:bg-gray-800">
          {about.map((item, index) => (
            <Link
              className="flex items-center justify-between rounded-md border-[1px] border-gray-300 py-1 pl-2"
              key={index}
              to={`/mbStaticData?type=About`}
              state={{ data: item }}
            >
              <p className="dark:text-gray-200">{item.title}</p>
              <i className="ri-arrow-drop-right-line text-3xl font-extralight dark:text-gray-200" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex h-fit flex-col items-center justify-center rounded-md bg-white p-1.5 dark:bg-gray-800">
          {mobileHelpLegalFaqs.map((item, index) => {
            return <SectionAndOptions key={index} section={item} />;
          })}
        </div>
      )}
      <MobileFooterMenu />
    </main>
  );
};

export default OptionsPage;
