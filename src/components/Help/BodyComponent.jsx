import BreadcrumbsWrapper from "../BreadcrumbsWrapper";

const BodyComponent = ({ heading, description, children }) => {
    return (
        <main className="bg-[rgb(55,113,142)] dark:bg-black w-[100%] pt-24 m-0 pb-12">
            <div className="text-white md:max-w-[1210px] mx-auto mt-2"><BreadcrumbsWrapper normalTextColor={"white"} mainTextColor={"white"} /></div>
            <section className="max-w-[1210px] mx-auto mt-8">
                <h1 className="text-white tracking-tight text-3xl">{heading}</h1>
                <p className="font-semibold text-white mt-1">{description}</p>
            </section>
            <section className="bg-white dark:bg-gray-800 flex items-center justify-center max-w-[1300px] mx-auto mt-8 p-14">
                <div className="flex w-full">
                    {children}
                </div>
            </section>
        </main>
    )
}

export default BodyComponent;