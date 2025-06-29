import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ContentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const mode = searchParams.get("mode");
  const { state } = useLocation();
  const data = state.data;

  return (
    <main className="pt-18 pb-14 px-1.5 flex flex-col gap-1">
      <button onClick={() => navigate(-1)} className="w-fit flex items-center">
        <i className="ri-arrow-drop-left-line text-4xl -ml-3.5"></i>
        <p className="-ml-1 font-medium">Back</p>
      </button>
      <div className="flex flex-col gap-0.5">
        <div className="w-full bg-primary text-white font-semibold text-xl px-1.5 py-2">
          {data.question || data.title}
        </div>
        {type === "Support" ? (
          mode === "form" ? (
            <p className="px-2 text-red-500">Current working</p>
          ) : (
            <p className="px-2 mt-1">{data.description}</p>
          )
        ) : (
          <div className="px-2">
            {data?.description &&
              data.description.map((item, index) => {
                return (
                  <div
                    className="mt-2"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
            {data?.list?.mainList && (
              <ul className="list-disc ml-6 mt-2">
                {data.list.mainList.map((item, index) => (
                  <li
                    className="mt-1.5"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
                {data?.list?.subList && (
                  <ul className="list-[circle] ml-6">
                    {data.list.subList.map((item, index) => (
                      <li
                        className="mt-1.5"
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
                    className="mt-2"
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
