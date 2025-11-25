// Done

import SocialLinks from "./SocialLinks";

const LogoAndAttribution = () => {
  // console.log("LogoAndAttribution rendered")
  return (
    <div className="flex flex-col gap-5 md:gap-8">

      <div className="logo flex flex-col gap-2.5">
        <div className="flex gap-2.5 items-center">
          <img
            src="/images/square.png"
            height={60}
            width={60}
            alt="Bottom Logo"
            className="max-lg:h-12 max-lg:w-12"
          />
          <img
            className="h-9 md:h-11 w-44 md:w-52 mt-2"
            src="/images/bottomLogo.png"
            alt="Company footer logo"
          />
        </div>
        <p className="text-gray-800 text-sm dark:text-gray-200">
          <span className="whitespace-nowrap">© 2025 Shivendra</span><span>┃</span><span>Food delivery app built for learning and
            demonstration.</span>
        </p>
      </div>

      <div className="attibution text-gray-800 w-fit max-md:mb-3">
        <p className="mb-2 text-lg dark:text-white">Developed By</p>
        <div className="flex gap-2.5 w-fit">
          <img
            className="h-[14vh] w-[14vh] rounded-[50%] object-cover border-2 border-primary p-1"
            src="/images/MY-min.jpeg"
            alt="Developer image"
          />
          <div className="flex flex-col justify-center italic dark:text-gray-200">
            <p className="text-lg ">Shivendra Dwivedi</p>
            <p className="flex items-center gap-2 text-sm">
              <span>Web Developer</span>
              <p className="text-gray-800 lg:hidden dark:text-gray-300">•</p>
              <a
                href="https://portfolio.shivendra.site"
                target="__blank"
                className="lg:hidden text-primary text-sm tracking-wider underline underline-offset-2">
                Portfolio
              </a>
            </p>
            <a
              href="https://portfolio.shivendra.site"
              target="__blank"
              className="hidden lg:inline text-primary text-sm tracking-wider underline underline-offset-2">
              Portfolio
            </a>

            {/* Small screen icons */}
            <div className="max-md:flex gap-3 mt-2 hidden">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Large screen icons */}
        <div className="hidden md:flex flex-col gap-2 w-full mt-7">
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
