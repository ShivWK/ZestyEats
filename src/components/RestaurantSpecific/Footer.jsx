import Disclaimer from '../Footer/Disclaimer';

const Footer = ({ license, address }) => {
  return (
    <>
      <div className="w-full bg-gray-100 p-4 pb-1 dark:bg-gray-300">
        <div id="lisence" className="flex items-center gap-4">
          <img
            className="h-9"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
            alt="License"
          />
          <p className="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-700">
            {license?.card?.card?.text.toString()}
          </p>
        </div>
        <hr className="my-4 text-gray-500 dark:text-gray-700" />
        <div id="address" className="">
          <p className="font-bold text-gray-500 dark:text-gray-600">
            {address?.card?.card?.name}
          </p>
          <p className="-mt-1 text-sm text-gray-700 dark:text-gray-800">{`(Outlet: ${address?.card?.card?.area})`}</p>
          <div className="mt-2 flex items-center gap-2">
            <i className="ri-map-pin-line text-xl text-gray-500 dark:text-gray-600"></i>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-600">
              {address?.card?.card?.completeAddress}
            </p>
          </div>
        </div>
        <hr className="my-4 text-gray-500" />
        <div className="flex items-center gap-1.5">
          <p className="dark:text-gray-700text-gray-700 font-bold">{`Thanks for choosing us`}</p>
          <i className="ri-poker-hearts-fill cursor-pointer text-xl text-red-600"></i>
        </div>
      </div>
      <Disclaimer />
    </>
  );
};

export default Footer;
