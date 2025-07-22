import { useSearchParams } from "react-router-dom";
import {
  termsAndConditions,
  privacyPolicy,
  cookiesPolicy,
} from "../utils/DummyData";
import BreadcrumbsWrapper from "./BreadcrumbsWrapper";
import ScooterAnimation from "../utils/ScooterAnimation";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginOpened, setModalTrace } from "../features/Login/loginSlice";
import { useEffect } from "react";

const CompanyPolicies = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoginOpened = useSelector(selectLoginOpened);

  useEffect(() => {
    if (isLoginOpened) {
      dispatch(setModalTrace("terms"))
    }
  }, [])

  let dataToMap = null;
  const searchMode = searchParams.get("mode");

  if (searchMode === "termsAndConditions") dataToMap = termsAndConditions;
  else if (searchMode === "privacyPolicy") dataToMap = privacyPolicy;
  else if (searchMode === "cookiesPolicy") dataToMap = cookiesPolicy;

  const pageMainHeading = dataToMap[0];
  const restData = dataToMap[1];

  return (
    <>
      <main className="w-full lg:max-w-[1070px] mx-auto pt-20 lg:pt-26 overflow-x-hidden max-lg:px-2 max-lg:pr-3 font-sans">
        <BreadcrumbsWrapper />
        <section className="mt-3 lg:mt-4">
          <h1>{pageMainHeading.mainHeading}</h1>
          <p className="text-xs text-gray-700 mb-3 font-medium">Last updated: 16/07/2025</p>
          <p className="text-gray-800 text-justify">{pageMainHeading.description}</p>
        </section>
        <section>
          {restData.map((data, index) => {
            return (
              <div key={index} className="mt-4">
                <h2>{data.title}</h2>

                {data.description && (
                  <p
                    className="text-gray-900 text-justify"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></p>
                )}

                {data.list && (
                  <ul className="list-disc mt-1 ml-6">
                    {data.list.mainList.map((data, index) => (
                      <li
                      key={index}
                        className="my-0.5"
                        dangerouslySetInnerHTML={{ __html: data }}
                      ></li>
                    ))}
                    {data.list.subList && (
                      <ul className="list-[circle] ml-6 mt-1">
                        {data.list.subList.map((data, index) => (
                          <li
                          key={index}
                            className="my-0.5"
                            dangerouslySetInnerHTML={{ __html: data }}
                          ></li>
                        ))}
                      </ul>
                    )}
                  </ul>
                )}

                {data.description2 && (
                  <p className="mt-1 text-justify">{data.description2}</p>
                )}

                {data.list2 && (
                  <ul className="list-disc ml-6 mt-1">
                    {data.list2.mainList.map((data, index) => (
                      <li key={index} className="my-0.5" dangerouslySetInnerHTML={{ __html: data }}></li>
                    ))}
                  </ul>
                )}

                {data.subDescription && (
                  <p className="mt-1 text-justify"
                    dangerouslySetInnerHTML={{ __html: data.subDescription }}
                  ></p>
                )}
              </div>
            );
          })}
        </section>
        <div className="lg:hidden mt-5">
          <ScooterAnimation />
        </div>
      </main>
      <div className="hidden lg:block mt-7">
        <ScooterAnimation />
      </div>
    </>
  );
};

export default CompanyPolicies;
