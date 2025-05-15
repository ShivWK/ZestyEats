import LogoAndAttribution from "./LogoAndAttribution";
import CompanyLinks from "./CompanyLinks";

const SubFooter = () => {
  return (
    <div className="border-2 flex max-w-[1210px] items-center text-white font-bold h-16 w-full mt-3">
      <LogoAndAttribution />
      <CompanyLinks />
    </div>
  );
};

export default SubFooter;
