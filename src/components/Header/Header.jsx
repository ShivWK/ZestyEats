import Navbar from "./Navbar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header>
      <div className="mx-auto h-20 w-full max-w-[1210px] flex justify-between items-center">
        <Logo className="" />
        <Navbar />
      </div>
    </header>
  );
}

// import react from 'react'; // This is not required in react 17 and above because here React.createElement() is not used for JSX to JS convertion instead special functions from react/jsx-runtime like:

// const element = <h1>Hello, World!</h1>;
// // Transformed to:
// import { jsx as _jsx } from "react/jsx-runtime";

// const element = _jsx("h1", { children: "Hello, World!" });
