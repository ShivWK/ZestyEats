import Disclaimer from "../Footer/Disclaimer";

const Footer = ({ license, address }) => {
    return (
        <>
            <div className="w-full p-4 pb-1 bg-gray-100">
                <div id="lisence" className="flex items-center gap-4">
                    <img
                        className="h-9"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
                        alt="License"
                    />
                    <p className="font-semibold text-gray-500 text-sm mt-2">
                        {license?.card?.card?.text.toString()}
                    </p>
                </div>
                <hr className="text-gray-500 my-4" />
                <div id="address" className="">
                    <p className="font-bold text-gray-500">{address?.card?.card?.name}</p>
                    <p className="text-sm -mt-1 text-gray-700">{`(Outlet: ${address?.card?.card?.area})`}</p>
                    <div className="flex gap-2 mt-2 items-center">
                        <i className="ri-map-pin-line text-xl text-gray-500"></i>
                        <p className="text-sm text-gray-500 font-semibold">
                            {address?.card?.card?.completeAddress}
                        </p>
                    </div>
                </div>
                <hr className="text-gray-500 my-4" />
                <div className="flex gap-1.5 items-center">
                    <p className="text-gray-700 font-bold">{`Thanks for choosing us`}</p>
                    <i className="ri-poker-hearts-fill text-xl text-red-600 cursor-pointer"></i>
                </div>
            </div>
            <Disclaimer />
        </>
    );
};

export default Footer;
