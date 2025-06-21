import LogoAndAttribution from "./LogoAndAttribution";
import CompanyLinks from "./CompanyLinks";
import { memo } from "react";

const SubFooter = memo(({ isOpen, openCities }) => {
  return (
    <div className="flex flex-col md:flex-row max-w-[1210px] justify-between items-center text-white font-bold p-2 w-full mt-3">
      <LogoAndAttribution />
      <CompanyLinks isOpen={isOpen} openCities={openCities} />
    </div>
  );
});

export default SubFooter;
