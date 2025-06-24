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
    <header> 
      <div className="flex justify-between items-center mx-auto h-16 md:h-20 w-full md:w-[1210px]">
        <Logo searchPlaceholder={searchPlaceholder}/>
        <Navbar showAbout={showAbout} showSearch={showSearch} showOffers={showOffers} showCart={showCart} />
      </div>
    </header>
  );
}

// import react from 'react'; // This is not required in react 17 and above because here React.createElement() is not used for JSX to JS convertion instead special functions from react/jsx-runtime like:
