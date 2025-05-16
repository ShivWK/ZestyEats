import LogoAndAttribution from "./LogoAndAttribution";
import CompanyLinks from "./CompanyLinks";

const SubFooter = ({ isOpen, openCities }) => {
  return (
    <div className="flex max-w-[1210px] justify-between items-center text-white font-bold p-2 w-full mt-3">
      <LogoAndAttribution />
      <CompanyLinks isOpen={isOpen} openCities={openCities} />
    </div>
  );
};

export default SubFooter;
