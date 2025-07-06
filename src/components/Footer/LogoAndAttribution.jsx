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
          />
          <img
            className="h-11 w-52 mt-2"
            src="/images/bottomLogo.png"
            alt="Company footer logo"
          />
        </div>
        <p className="text-gray-800 text-sm">
          © 2025 Shivendra | Food delivery app built for learning and
          demonstration.
        </p>
      </div>
      <div className="attibution text-gray-800 w-fit max-md:mb-3">
        <p className="mb-2 text-lg">Developed By</p>
        <div className="flex gap-2.5 w-fit">
          <img
            onClick={() => {
              dispatch(setDpModelHide(false))
              dispatch(setDpModelOpen(true))
            }}

            className="h-[14vh] w-[14vh] rounded-[50%] object-cover border-2 border-primary p-1 cursor-pointer"
            src="/images/MY-min.png"
            alt="Developer image"
          />
          <div className="flex flex-col justify-center  italic">
            <p className="text-lg ">Shivendra Dwivedi</p>
            <p className="text-sm">Software Developer</p>
            <div className="max-md:flex gap-3 mt-2 hidden">
              <a
                href="https://www.linkedin.com/in/shivendra-dwivedi"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i
                  className="fa-brands fa-linkedin text-2xl"
                  style={{ color: "#0077b5" }}
                ></i>
              </a>
              <a
                href="https://github.com/ShivWK"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i className="fa-brands fa-square-github text-2xl"></i>
              </a>
              <a
                href="https://x.com/Shivendrawk"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                target="__block"
              >
                <i className="fa-brands fa-square-x-twitter text-2xl"></i>
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
                href="mailto:shivendrawk@gmail.com"
                className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              >
                <i
                  className="fa-solid fa-envelope text-2xl"
                  style={{ color: "#d93025" }}
                ></i>
              </a>
            </div>
            {dpModel && <div>
              <div className="fixed flex items-center justify-center md:justify-start h-full w-full top-0 right-0 bg-[rgba(0,0,0,0.3)]" onClick={dpOverlayClickHandler}>
                <img onAnimationEnd={(e) => {
                  const classList = e.target.classList;

                  if (classList.contains("animate-dp-hide")) {
                    window.history.back();
                    dispatch(setDpModelOpen(false));
                  }
                }}
                  src="/images/MY-min.png"
                  className={`rounded-full h-[35vh] md:h-[50vh] w-[35vh] md:w-[50vh] p-1 border-2 border-primary transform transition-transform duration-300 ease-in-out md:ml-32 animate-dp-show ${dpModelHide && "animate-dp-hide"}`} alt="Developer image" />
              </div>
            </div>}
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 w-full mt-7">
          <p>Social Links</p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/shivendra-dwivedi"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i
                className="fa-brands fa-linkedin text-2xl"
                style={{ color: "#0077b5" }}
              ></i>
            </a>
            <a
              href="https://github.com/ShivWK"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i className="fa-brands fa-square-github text-2xl"></i>
            </a>
            <a
              href="https://x.com/Shivendrawk"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
              target="__block"
            >
              <i className="fa-brands fa-square-x-twitter text-2xl"></i>
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
              href="mailto:shivendrawk@gmail.com"
              className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
            >
              <i
                className="fa-solid fa-envelope text-2xl"
                style={{ color: "#d93025" }}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoAndAttribution;
