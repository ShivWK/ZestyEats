import Navbar from "./Navbar";
import Logo from "./Logo";

export default function MainHeader({
  searchPlaceholder = false,
  showAbout = true,
  showSearch = true,
  showOffers = true,
  showCart = true,
}) {
  return (
    <header> className="w-full md:max-w-[1210px] px-4 md:px-0 mx-auto flex justify-between items-center h-16 md:h-20 border-2"
      <div className="mx-auto h-16 md:h-20 w-full md:max-w-[1210px] flex justify-between items-center border-2 ">
        <Logo searchPlaceholder={searchPlaceholder}/>
        <Navbar showAbout={showAbout} showSearch={showSearch} showOffers={showOffers} showCart={showCart} />
      </div>
    </header>
  );
}

// import react from 'react'; // This is not required in react 17 and above because here React.createElement() is not used for JSX to JS convertion instead special functions from react/jsx-runtime like:
