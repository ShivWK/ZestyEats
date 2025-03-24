
export default function NavItem({icon, text, altText}) {
    return <li>
        <img src={icon} alt={altText} height="25px" width="25px" />
        <sapn>{text}</sapn>
    </li>
}