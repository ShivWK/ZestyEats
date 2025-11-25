// Done

import { SOCIAL_LINK_DETAILS } from "../../utils/constants"

const SocialLinks = () => {
    // console.log("SocialLinks rendered")
    return (
        <>
            {
                SOCIAL_LINK_DETAILS.map((data, index) => <a
                    key={index}
                    href={data.link}
                    className="md:hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                    target="__block"
                >
                    <i
                        className={data.iconClass}
                    ></i>
                </a>)
            }
        </>
    )
}

export default SocialLinks