import { NavLink, useSearchParams } from "react-router-dom";
import { mobileHelpLegalFaqs } from "../../utils/helpAndSupportData";
import { about } from "../../utils/aboutPageData";
import SectionAndOptions from "./SectionAndOptions";
import MobileFooterMenu from "../Footer/MobileFooterMenu";

const OptionsPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <main className={`pt-16 w-full px-1.5 pb-20 bg-[rgb(55,113,142)] ${mode === "about" && "h-full"}`}>
      {mode === "about" ? (
        <div className="p-2 mt-4 h-fit text-gray-700 font-medium flex flex-col justify-start gap-2 bg-white rounded-md">
          {about.map((item, index) => (
            <NavLink
              className="py-1 pl-2 border-[1px] border-gray-300 rounded-md flex justify-between items-center"
              key={index}
              to={`/mbStaticData?type=About`}
              state={{ data: item }}
            >
              <p>{item.title}</p>
              <i className="ri-arrow-drop-right-line text-3xl font-extralight" />
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="flex mt-4 flex-col items-center justify-center p-1.5 rounded-md bg-white h-fit">
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
