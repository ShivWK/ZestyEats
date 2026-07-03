// Done

import LogoAndAttribution from './LogoAndAttribution';
import CompanyLinks from './CompanyLinks';

const SubFooter = ({ isOpen, openCities }) => {
  // console.log("SubFooter rendered")
  return (
    <div className="mt-1.5 flex w-full max-w-[1210px] flex-col items-center justify-between p-2 font-bold text-white md:mt-3 md:flex-row">
      <LogoAndAttribution />
      <CompanyLinks isOpen={isOpen} openCities={openCities} />
    </div>
  );
};

export default SubFooter;
