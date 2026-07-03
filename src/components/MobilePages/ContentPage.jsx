// Done
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Contact from '../Help/Contact';

const ContentPage = () => {
  // console.log("ContentPage rendered");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const mode = searchParams.get('mode');
  const { state } = useLocation();
  const data = state.data;

  return (
    <main className="flex flex-col gap-1 px-1.5 pt-18 pb-14">
      <button
        onClick={() => navigate(-1)}
        className="flex w-fit items-center dark:text-gray-200"
      >
        <i className="ri-arrow-drop-left-line -ml-3.5 text-4xl"></i>
        <p className="-ml-1 font-medium">Back</p>
      </button>
      <div className="flex flex-col gap-0.5">
        <div className="dark:bg-darkPrimary bg-primary w-full px-1.5 py-2 text-xl font-semibold text-white">
          <p>{data.question || data.title}</p>
        </div>
        {type === 'Support' ? (
          mode === 'form' ? (
            <Contact />
          ) : (
            <p className="mt-1 px-2 dark:text-gray-200">{data.description}</p>
          )
        ) : (
          <div className="px-2">
            {data?.description &&
              data.description.map((item, index) => {
                return (
                  <div
                    className="mt-2 dark:text-gray-200"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
            {data?.list?.mainList && (
              <ul className="mt-2 ml-6 list-disc">
                {data.list.mainList.map((item, index) => (
                  <li
                    className="mt-1.5 dark:text-gray-200"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
                {data?.list?.subList && (
                  <ul className="ml-6 list-[circle]">
                    {data.list.subList.map((item, index) => (
                      <li
                        className="mt-1.5 dark:text-gray-200"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                )}
              </ul>
            )}
            {data?.lastDescription &&
              data.lastDescription.map((item, index) => {
                return (
                  <div
                    className="mt-2 dark:text-gray-200"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
};

export default ContentPage;
