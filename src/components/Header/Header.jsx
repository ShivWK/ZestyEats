import Navbar from './Navbar';
import Logo from './Logo';

export default function Header() {
    return <header className="mx-auto h-20 w-[90%] max-w-[1200px] m border-2 ">
        <Logo className="" />
        <Navbar />
    </header>;
}



// import react from 'react'; // This is not required in react 17 and above because here React.createElement() is not used for JSX to JS convertion instead special functions from react/jsx-runtime like:

// const element = <h1>Hello, World!</h1>;
// // Transformed to:
// import { jsx as _jsx } from "react/jsx-runtime";

// const element = _jsx("h1", { children: "Hello, World!" });