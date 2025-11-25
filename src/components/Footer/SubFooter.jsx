// Done

import LogoAndAttribution from "./LogoAndAttribution";
import CompanyLinks from "./CompanyLinks";

const SubFooter = ({ isOpen, openCities }) => {
  // console.log("SubFooter rendered")
  return (
    <div className="flex flex-col md:flex-row max-w-[1210px] justify-between items-center text-white font-bold p-2 w-full mt-1.5 md:mt-3">
      <LogoAndAttribution />
      <CompanyLinks isOpen={isOpen} openCities={openCities} />
    </div>
  );
};

export default SubFooter;
