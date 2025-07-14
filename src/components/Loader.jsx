const Loader = ({ size }) => {
  return size === "large" ? (
    <div className="w-full h-[250px] md:h-[400px] bg-gray-950 flex justify-center items-center pt-16 md:pt-20">
      <div className="main-large"></div>
    </div>
  ) : (
    <div className={`main-small max-lg:h-[3vh] max-lg:w-[3vh]`}></div>
  );
};

export default Loader;
