
export default function NavItem({icon, text}) {
    return (
        <li className="group flex items-center justify-between gap-3 hover:cursor-pointer :hover:font-[#ff5200] ">
            {/* <img src={icon} alt={altText} height="25px" width="25px" /> */}
            <i class={`fa-solid ${icon} group-hover:text-[#ff5200]`}></i>
            <sapn className="group-hover:text-[#ff5200]">{text}</sapn>
        </li>
    )
}