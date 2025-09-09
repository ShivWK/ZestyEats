import { selectDpModel, selectDpModelHide, setDpModelHide, setDpModelOpen } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";

const LogoAndAttribution = () => {
  const dpModel = useSelector(selectDpModel);
  const dpModelHide = useSelector(selectDpModelHide);

  const dispatch = useDispatch();

  const dpOverlayClickHandler = (e) => {
    console.log("called overlay");
    e.stopPropagation();
    dispatch(setDpModelHide(true));
  }

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
            onClick={() => {
              dispatch(setDpModelHide(false))
              dispatch(setDpModelOpen(true))
            }}

            className="h-[14vh] w-[14vh] rounded-[50%] object-cover border-2 border-primary p-1"
            src="/images/MY-min.png"
            alt="Developer image"
          />
          <div className="flex flex-col justify-center italic dark:text-gray-200">
            <p className="text-lg ">Shivendra Dwivedi</p>
            <p className="text-sm">Web Developer</p>
            {/* <a href="" className="flex items-center text-primary gap-1 text-sm tracking-wider">
              Portfolio
            </a> */}
            <div className="max-md:flex gap-3 mt-2 hidden">
              <a
                href="https://www.linkedin.com/in/shivendra-dwivedi"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i
                  className="fa-brands fa-linkedin text-xl text-[#0077b5] dark:text-[rgb(41,140,240)]"
                ></i>
              </a>
              <a
                href="https://portfolio.shivendra.site"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i className="fa-solid fa-globe text-xl text-blue-500 dark:text-blue-400"></i>
              </a>
              <a
                href="https://github.com/ShivWK"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i className="fa-brands fa-square-github text-xl dark:text-gray-300"></i>
              </a>
              <a
                href="https://x.com/Shivendrawk"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i className="fa-brands fa-square-x-twitter text-xl dark:text-gray-300"></i>
              </a>
              <a
                href="https://instagram.com/shivendrawk"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i
                  className="fa-brands fa-instagram text-xl"
                  style={{ color: "#e1306c" }}
                ></i>
              </a>
              <a
                href="mailto:shivendrawk@gmail.com"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              >
                <i
                  className="fa-solid fa-envelope text-xl"
                  style={{ color: "#d93025" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 w-full mt-7">
          <p className="dark:text-white">Social Links</p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/shivendra-dwivedi"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i
                className="fa-brands fa-linkedin text-2xl text-[#0077b5] dark:text-[rgb(41,140,240)]"
              ></i>
            </a>
            <a
              href="https://portfolio.shivendra.site"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i className="fa-solid fa-globe text-2xl text-blue-500 dark:text-blue-400"></i>
            </a>
            <a
              href="https://github.com/ShivWK"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i className="fa-brands fa-square-github text-2xl dark:text-gray-300"></i>
            </a>
            <a
              href="https://x.com/Shivendrawk"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i className="fa-brands fa-square-x-twitter text-2xl dark:text-gray-300"></i>
            </a>
            <a
              href="https://instagram.com/shivendrawk"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i
                className="fa-brands fa-instagram text-2xl"
                style={{ color: "#e1306c" }}
              ></i>
            </a>
            <a
              href="mailto:shivendra@shivendra.site"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
            >
              <i className="fa-solid fa-envelope text-2xl text-[#d93025]"></i>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoAndAttribution;
