import { useSearchParams } from 'react-router-dom';
import {
  termsAndConditions,
  privacyPolicy,
  cookiesPolicy,
} from '../utils/DummyData';
import BreadcrumbsWrapper from './BreadcrumbsWrapper';
import ScooterAnimation from '../utils/ScooterAnimation';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoginOpened, setModalTrace } from '../features/Login/loginSlice';
import { useEffect } from 'react';

const CompanyPolicies = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoginOpened = useSelector(selectLoginOpened);

  useEffect(() => {
    if (isLoginOpened) {
      dispatch(setModalTrace('terms'));
    }
  }, []);

  let dataToMap = null;
  const searchMode = searchParams.get('mode');

  if (searchMode === 'termsAndConditions') dataToMap = termsAndConditions;
  else if (searchMode === 'privacyPolicy') dataToMap = privacyPolicy;
  else if (searchMode === 'cookiesPolicy') dataToMap = cookiesPolicy;

  const pageMainHeading = dataToMap[0];
  const restData = dataToMap[1];

  return (
    <>
      <main className="mx-auto w-full overflow-x-hidden pt-20 font-sans max-lg:px-2 max-lg:pr-3 lg:max-w-[1070px] lg:pt-26">
        <BreadcrumbsWrapper />
        <section className="mt-3 lg:mt-4">
          <h1 className="dark:text-white">{pageMainHeading.mainHeading}</h1>
          <p className="mb-3 text-xs font-medium text-gray-700 dark:text-gray-300">
            Last updated: 16/07/2025
          </p>
          <p className="text-justify text-gray-800 dark:text-gray-200">
            {pageMainHeading.description}
          </p>
        </section>
        <section>
          {restData.map((data, index) => {
            return (
              <div key={index} className="mt-4">
                <h2 className="dark:text-white">{data.title}</h2>

                {data.description && (
                  <p
                    className="text-justify text-gray-900 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></p>
                )}

                {data.list && (
                  <ul className="mt-1 ml-6 list-disc">
                    {data.list.mainList.map((data, index) => (
                      <li
                        key={index}
                        className="my-0.5 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: data }}
                      ></li>
                    ))}
                    {data.list.subList && (
                      <ul className="mt-1 ml-6 list-[circle]">
                        {data.list.subList.map((data, index) => (
                          <li
                            key={index}
                            className="my-0.5 dark:text-gray-200"
                            dangerouslySetInnerHTML={{ __html: data }}
                          ></li>
                        ))}
                      </ul>
                    )}
                  </ul>
                )}

                {data.description2 && (
                  <p className="mt-1 text-justify dark:text-gray-200">
                    {data.description2}
                  </p>
                )}

                {data.list2 && (
                  <ul className="mt-1 ml-6 list-disc">
                    {data.list2.mainList.map((data, index) => (
                      <li
                        key={index}
                        className="my-0.5 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: data }}
                      ></li>
                    ))}
                  </ul>
                )}

                {data.subDescription && (
                  <p
                    className="mt-1 text-justify dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: data.subDescription }}
                  ></p>
                )}
              </div>
            );
          })}
        </section>
        <div className="mt-5 lg:hidden">
          <ScooterAnimation />
        </div>
      </main>
      <div className="mt-7 hidden lg:block">
        <ScooterAnimation />
      </div>
    </>
  );
};

export default CompanyPolicies;
