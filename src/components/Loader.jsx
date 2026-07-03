const Loader = ({ size }) => {
  return size === 'large' ? (
    <div className="flex h-[250px] w-full items-center justify-center bg-gray-950 pt-16 md:h-[400px] md:pt-20 dark:bg-gray-500">
      <div className="main-large"></div>
    </div>
  ) : (
    <div className={`main-small max-lg:h-[3vh] max-lg:w-[3vh]`}></div>
  );
};

export default Loader;
