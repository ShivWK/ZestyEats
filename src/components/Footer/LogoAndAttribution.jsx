// Done

import SocialLinks from './SocialLinks';

const LogoAndAttribution = () => {
  // console.log("LogoAndAttribution rendered")
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div className="logo flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/square.png"
            height={60}
            width={60}
            alt="Bottom Logo"
            className="max-lg:h-12 max-lg:w-12"
          />
          <img
            className="mt-2 h-9 w-44 md:h-11 md:w-52"
            src="/images/bottomLogo.png"
            alt="Company footer logo"
          />
        </div>
        <p className="text-sm font-normal text-gray-800 dark:text-gray-200">
          <span className="whitespace-nowrap">© 2025 Shivendra</span>
          <span>┃</span>
          <span>Food delivery app built for learning and demonstration.</span>
        </p>
      </div>

      <div className="attibution w-fit text-gray-800 max-md:mb-3">
        <p className="mb-2 text-lg dark:text-white">Developed By</p>
        <div className="flex w-fit gap-2.5">
          <img
            className="border-primary h-[14vh] w-[14vh] rounded-[50%] border-2 object-cover p-1"
            src="/images/MY-min.jpeg"
            alt="Developer image"
          />
          <div className="flex flex-col justify-center italic dark:text-gray-200">
            <p className="text-lg">Shivendra Dwivedi</p>
            <p className="flex items-center gap-2 text-sm">
              <span className='font-normal'>Web Developer</span>
              <p className="text-gray-800 lg:hidden dark:text-gray-300">•</p>
              <a
                href="https://portfolio.shivendra.site"
                target="__blank"
                className="text-primary text-sm tracking-wider underline underline-offset-2 lg:hidden"
              >
                Portfolio
              </a>
            </p>
            <a
              href="https://portfolio.shivendra.site"
              target="__blank"
              className="text-primary hidden text-sm tracking-wider underline underline-offset-2 lg:inline"
            >
              Portfolio
            </a>

            {/* Small screen icons */}
            <div className="mt-2 hidden gap-3 max-md:flex">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Large screen icons */}
        <div className="mt-7 hidden w-full flex-col gap-2 md:flex">
          <p className="dark:text-white">Social Links</p>
          <div className="flex gap-3">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoAndAttribution;
