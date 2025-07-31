import { selectUserDetails, selectCurrentTheme } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import MobileFooterMenu from "./Footer/MobileFooterMenu";
import ScooterAnimation from "./../utils/ScooterAnimation";

const MobileProfile = () => {
    const userDetails = useSelector(selectUserDetails);
    const theme = useSelector(selectCurrentTheme);
    const navigate = useNavigate();

    return <main className="pt-14 overflow-hidden h-full">
        <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl h-44 profile-animation overflow-hidden">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-long-line text-2xl text-white font-medium"></i>
            <div className="flex items-center justify-between mt-7">
                <div>
                    <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs">Shivendra Dwivedi</h1>
                    <div className="flex items-center gap-1 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200">7897532327</p>
                        <Link className=" dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                    <div className="flex items-center gap-1 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200 -mt-1 tracking-wide">shivendra@shivendra.site</p>
                        <Link className="mb-0.5 dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                </div>
                <button className="px-5 py-1 rounded-md font-sans font-bold tracking-wide text-white bg-blue-600">
                    Edit
                </button>
            </div>
        </section>
        <div className="my-4">
            <ScooterAnimation />
        </div>
        <section className="mx-auto w-[90%] rounded-2xl p-2 bg-primary dark:bg-gray-800">
            <div className="flex gap-2 items-center p-2 border-b-2 border-b-white">
                <i className="fas fa-credit-card text-gray-100 dark:text-primary text-xl"></i>
                <p className="text-white dark:text-gray-100">Payments</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
            <div className="flex gap-2 items-center p-2 border-b-2 border-b-white">
                <i className="ri-map-pin-user-fill text-gray-100 text-xl dark:text-primary"></i>
                <p className="text-white dark:text-gray-100">Addresses</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
            <div className="flex gap-2 items-center p-2">
                <i className="ri-logout-circle-r-line text-gray-100 text-xl dark:text-primary"></i>
                <p className="text-white dark:text-gray-100">Logout</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
        </section>
        <section className="mx-auto w-[90%] flex items-center mt-12 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[100px] h-[150px] ml-3" viewBox="0 0 528.7404 823.33557" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><path d="M186.60436,240.6221c-9.79607-47.89083,21.0859-94.6554,68.97673-104.45147,47.89083-9.79607,94.65572,21.08584,104.45179,68.97666,7.94468,38.8398-10.86853,76.93462-43.80824,95.1737l42.17352,73.66087-133.56825,96.35521-11.96134-102.33587s22.88103-34.49118,27.35796-63.03117c-26.57641-10.74246-47.44705-34.15903-53.62219-64.34792Z" fill="#ed9da0"/><polyline points="186.60806 169.49959 185.11586 214.18117 194.41912 227.47154" fill="#090814"/><path d="M238.45424,390.43862l-5.31615-25.25171s-5.89749-39.09123,16.27902-60.31499c0,0-45.12138,12.42881-43.32605,48.99776l-111.17285,53.84643,19.93556,356.182s-23.92267,21.2646,10.6323,35.88401c0,0,170.11678,41.20016,269.79458,14.61941l26.58075-6.64519,23.92267,6.64519s26.58075-19.93556,19.93556-45.18727l11.96134-95.69069,21.2646-275.11073-45.18727-23.92267s-3.98711-10.6323-17.27749-10.6323l-67.7809-37.21305s-32.49024-17.84513-51.46412-26.50979c-1.26548-.5779-2.32122,1.09496-1.26609,2.00166,9.78577,8.4091,17.27475,24.77666-23.02492,48.43081,0,0-18.93768,29.17572-15.44951,39.83957l-39.04102.03155Z" fill="#ff5200"/><path d="M154.75273,805.76454h-2.65807v-37.31168l6.79493-167.92465c-16.88942-91.0131,31.83622-209.41423,32.33071-210.6005l.34086-.81767h46.89302v2.65807h-45.11313c-4.28822,10.64917-47.8971,122.13256-31.81091,208.42005l.02758.14796-.00616.14926-6.79996,168.02069.00114,37.25847Z" fill="#090814"/><path d="M304.9061,628.3363h-59.24898l-93.59031-30.56786h-27.35028l-29.79833,34.49567,34.55497,29.29812,15.94845,6.64519s103.66491,79.74224,128.91662,83.72935,39.87112-3.98711,39.87112-3.98711l-9.30326-119.61336Z" fill="#ed9da0"/><circle cx="181.30563" cy="507.3939" r="7.97422" fill="#090814"/><circle cx="175.98948" cy="600.42652" r="7.97422" fill="#090814"/><circle cx="290.28669" cy="506.06487" r="7.97422" fill="#090814"/><circle cx="282.31247" cy="605.74267" r="7.97422" fill="#090814"/><circle cx="318.19648" cy="410.37418" r="7.97422" fill="#090814"/><circle cx="203.89927" cy="410.37418" r="7.97422" fill="#090814"/><path d="M396.3734,571.48926c-10.93016-20.40929-39.78124-26.24589-64.44111-13.03858-14.09312,7.54722-23.74032,19.68507-27.40328,32.5082l-130.13891,65.27468-44.91698,5.32913-34.55497,9.44862-22.59363,75.60976,78.4132,10.6323,108.98106-31.8969-26.32279-37.12219,95.87109-51.08617c12.70373,4.0572,28.15314,2.75412,42.24658-4.7944,24.65987-13.20601,35.78959-40.45647,24.85975-60.86446Z" fill="#ed9da0"/><path d="M498.94555,398.41284s34.55497,33.22593,29.23882,143.53603l-45.18727,123.60047s-41.20016,45.18727-42.52919,62.46475c-1.32904,17.27749-35.88401,34.55497-63.79379,34.55497s-48.81092,5.88352-48.81092,5.88352l-4.35057,6.07781-22.87692-6.07781-18.32324-4.55449-7.97422-11.96134,13.29037-6.64519,2.65807-10.6323s-49.17438-66.45187,0-108.98106l55.81957-7.97422,14.61941,9.30326,2.65807-79.74224,25.25171-58.47764" fill="#ff5200"/><path d="M94.91821,407.7161s-29.23882,46.51631-29.23882,69.10994c0,0-15.94845,18.60652-14.61941,39.87112,0,0-15.94845,17.27749-10.6323,35.88401,0,0-17.27749,10.6323-17.27749,47.84534,0,0-37.21305,13.29037-17.27749,41.20016l-5.87271,34.0967s8.53078,29.69709,8.53078,45.64553c0,15.94845,19.93556,26.58075,19.93556,26.58075l27.90978,5.31615s17.27749,25.25171,58.47764,10.6323c0,0-53.16149-6.64519-31.8969-41.20016,21.2646-34.55497,46.51631-61.13572,46.51631-61.13572l-.00003-.00003c-19.03246-16.13705-21.25148-44.69868-4.9398-63.58169l8.54859-9.89617-15.57009-62.08392" fill="#ff5200"/><path d="M330.82709,173.06838l13.69445,63.2881s7.43082-30.44743,15.01223-22.53342c7.58141,7.91401-4.24826-24.07022-4.24826-24.07022l-24.45842-16.68446Z" fill="#090814"/><path d="M184.29428,206.52315l.49711-66.32237-25.41487-46.80201,9.30326-29.23882s5.31615-18.60652,18.60652-22.59363l17.27749-21.2646s7.97422-9.30326,17.27749-7.97422S268.35758.36616,268.35758.36616c0,0,16.61297-1.99356,27.24527,3.32259l38.54208,5.31615,6.64519,2.65807s11.96134,18.60652,29.23882,23.92267c0,0,9.30326,5.31615,11.96134,17.27749l17.27749,15.94845,2.65807,29.23882s1.32904,9.30326-1.32904,15.94845v15.94845l-11.96134,18.60652s2.65807,6.64519-15.94845,22.59363l-5.31615,49.17438s-.5434-9.18283-5.58785-.6043l-5.04445-12.68607s-23.92267-42.52919-65.12283-47.84534-86.55821-3.59375-107.32145,47.33703Z" fill={`${theme === "dark" ? "#ffffff" : "#d1d5dc"}`}/></svg>
            <div>
                <p className="dark:text-white text-2xl">Explore <span className="font-bold tracking-wider text-primary">ZestyEats</span></p>
                <button onClick={() => navigate("/")} className="dark:bg-darkPrimary bg-primary font-bold px-4 py-1 rounded-md text-white mt-3 mx-auto block">Home</button>
            </div>
        </section>
        <MobileFooterMenu />
    </main>
}

export default MobileProfile;

