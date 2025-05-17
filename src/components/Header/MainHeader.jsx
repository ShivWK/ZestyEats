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
      <div className="mx-auto h-20 w-full max-w-[1210px] flex justify-between items-center">
        <Logo searchPlaceholder={searchPlaceholder}/>
        <Navbar showAbout={showAbout} showSearch={showSearch} showOffers={showOffers} showCart={showCart} />
      </div>
    </header>
  );
}

// import react from 'react'; // This is not required in react 17 and above because here React.createElement() is not used for JSX to JS convertion instead special functions from react/jsx-runtime like:
