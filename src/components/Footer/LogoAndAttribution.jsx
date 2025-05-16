const LogoAndAttribution = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="logo flex flex-col gap-2.5">
        <img
          className="h-14 w-52"
          src="/images/FooterLogo.png"
          alt="Company footer logo"
        />
        <p className="text-gray-800 text-sm">
          © 2025 Shivendra | Swiggy clone for educational use only.
        </p>
      </div>
      <div className="attibution  text-gray-800 w-fit">
        <p className="mb-2">Developed By</p>
        <div className="flex gap-2.5 w-fit">
          <img
            className="h-[10vh] w-[10vh] rounded-[50%] object-cover border-2 border-primary p-1"
            src="/images/MY-min.png"
            alt="Developer image"
          />
          <div className="flex flex-col justify-center  italic">
            <p className="text-lg ">Shivendra Dwivedi</p>
            <p className="text-sm">Frontend Developer</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-7">
          <p>Social Links</p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/shivendra-dwivedi" className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in" target="__block">
              <i
                className="fa-brands fa-linkedin text-xl"
                style={{ color: "#0077b5" }}
              ></i>
            </a>
            <a href="https://x.com/Shivendrawk" className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in" target="__block">
              <i className="fa-brands fa-square-x-twitter text-xl"></i>
            </a>
            <a href="https://github.com/ShivWK" className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in" target="__block">
              <i className="fa-brands fa-square-github text-xl"></i>
            </a>
            <a href="https://instagram.com/shivendrawk" className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in" target="__block">
              <i
                className="fa-brands fa-instagram text-xl"
                style={{ color: "#e1306c" }}
              ></i>
            </a>
            <a href="mailto:shivendrawk@gmail.com" className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in">
              <i
                className="fa-solid fa-envelope text-xl"
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
