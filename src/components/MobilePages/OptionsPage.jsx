import { NavLink, useSearchParams } from "react-router-dom";
import { mobileHelpLegalFaqs } from "../../utils/helpAndSupportData";
import { about } from "../../utils/aboutPageData";
import SectionAndOptions from "./SectionAndOptions";
import MobileFooterMenu from "../Footer/MobileFooterMenu";

const OptionsPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <main className="pt-16 w-ful px-1.5 pb-20 h-full">
      {mode === "about" ? (
        <div className="p-2 pt-4 h-full bg-gray-100 text-xl text-gray-700 font-medium flex flex-col justify-center gap-2 ">
          {about.map((item, index) => (
            <NavLink className="py-1 px-1.5 border-[1px] border-gray-300 rounded-md" key={index} to={`/mbStaticData?content=${item}`}>
              {item.title}
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="flex pt-4 flex-col items-center justify-center">
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
