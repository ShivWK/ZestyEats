import NavItem from './NavItem';
import { openLogInModal } from '../../features/Login/loginSlice';
import { useDispatch } from 'react-redux';

function handleClick() {
    alert("Cliked!");
}

export default function Navbar() {
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch(openLogInModal())
    }

    return (
        <nav>
            <ul className='flex gap-12 font-[620] items-center justify-evenly text-md'>
                <NavItem onClick={handleClick} icon={"fa-briefcase text-lg"} text='Swiggy Corporate' superScript={null} />
                <NavItem onClick={handleClick} icon={"fa-magnifying-glass text-lg"} text='Search' superScript={null} />
                <NavItem onClick={handleClick} icon={"ri-discount-percent-line text-xl"} text='Offers' superScript={"NEW"}/>
                <NavItem onClick={handleClick} icon={"fa-life-ring text-lg"} text='Help' superScript={null} />
                <NavItem onClick={handleSignIn} icon={"fa-user text-lg"} text='Sign In' superScript={null} />
                <NavItem onClick={handleClick} icon={"fa-cart-shopping text-lg"} text='Cart' superScript={null} />
            </ul>
        </nav>
    )
}