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
    <header className="w-full"> 
      <div className="flex justify-between w-full items-center mx-auto h-16 md:h-20 md:max-w-[1210px]">
        <Logo searchPlaceholder={searchPlaceholder}/>
        <Navbar showAbout={showAbout} showSearch={showSearch} showOffers={showOffers} showCart={showCart} />
      </div>
    </header>
  );
}

