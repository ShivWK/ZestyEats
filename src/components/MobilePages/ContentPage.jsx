import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Contact from "../Help/Contact";

const ContentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const mode = searchParams.get("mode");
  const { state } = useLocation();
  const data = state.data;

  return (
    <main className="pt-18 pb-14 px-1.5 flex flex-col gap-1">
      <button onClick={() => navigate(-1)} className="w-fit flex items-center dark:text-gray-200">
        <i className="ri-arrow-drop-left-line text-4xl -ml-3.5"></i>
        <p className="-ml-1 font-medium">Back</p>
      </button>
      <div className="flex flex-col gap-0.5">
        <div className="w-full dark:bg-darkPrimary bg-primary text-white font-semibold text-xl px-1.5 py-2">
          <p>{data.question || data.title}</p>
        </div>
        {type === "Support" ? (
          mode === "form" ? (
            <Contact />
          ) : (
            <p className="px-2 mt-1 dark:text-gray-200">{data.description}</p>
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
              <ul className="list-disc ml-6 mt-2">
                {data.list.mainList.map((item, index) => (
                  <li
                    className="mt-1.5 dark:text-gray-200"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
                {data?.list?.subList && (
                  <ul className="list-[circle] ml-6">
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
