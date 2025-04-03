import NavItem from './NavItem';
import Corporate from '../../assets/shopping-bag-outline.svg';

export default function Navbar() {
    return (
        <nav>
            <ul className='flex gap-12 font-[650] items-center justify-evenly text-md'>
                <NavItem icon={"fa-briefcase text-lg"} text='Swiggy Corporate' altText=""/>
                <NavItem icon={"fa-magnifying-glass text-lg"} text='Search' altText=""/>
                <NavItem icon={"ri-discount-percent-line text-xl"} text='Offers' altText=""/>
                <NavItem icon={"fa-life-ring text-lg"} text='Help' altText=""/>
                <NavItem icon={"fa-user text-lg"} text='Sign In' altText=""/>
                <NavItem icon={"fa-cart-shopping text-lg"} text='Cart' altText=""/>
            </ul>
        </nav>
    )
}