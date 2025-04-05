export default function NavItem({ icon, text, onClick, superScript }) {
  return (
    <li
      className="group flex items-center justify-between gap-3 hover:cursor-pointer :hover:font-[#ff5200]"
      onClick={onClick}
    >
      <i className={`fa-solid ${icon} group-hover:text-[#ff5200]`}></i>
      <span className="relative group-hover:text-[#ff5200]">
        {text}
        {superScript ? (
          <sup className="text-[#ff8e32] text-[10px] ml-0.5 absolute top-1 font-extrabold">{superScript}</sup>
        ) : null}
      </span>
      
    </li>
  );
}

// If take any element out of the noemal flow of the document, then parents inherited props wont work on it nly its own props will worf.