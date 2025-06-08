import MenuBar from "./MenuBar";
import ContentArea from "./ContentArea";

const HelpMain = () => {
    return <main className="bg-[rgb(55,113,142)] h-[100%] w-[100%] pt-24 m-0 pb-12">
        <section className="max-w-[1210px] mx-auto mt-8">
            <h1 className="text-white tracking-tight text-3xl">Help & Support</h1>
            <p className="font-semibold text-white mt-1">Let's take a step ahead and help you better.</p>
        </section>
        <section className="bg-white flex items-center justify-center max-w-[1300px] mx-auto mt-8 p-14">
            <div className="flex w-full">
                {<>
                    <MenuBar />
                    <ContentArea />
                </>}
            </div>
        </section>
    </main>
}

export default HelpMain;