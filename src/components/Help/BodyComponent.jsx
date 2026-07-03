// Done

import BreadcrumbsWrapper from '../BreadcrumbsWrapper';

const BodyComponent = ({ heading, description, children }) => {
  // console.log("help/BodyComponent rendered");
  return (
    <main className="m-0 w-[100%] bg-[rgb(55,113,142)] pt-24 pb-12 dark:bg-black">
      <div className="mx-auto mt-2 text-white md:max-w-[1210px]">
        <BreadcrumbsWrapper normalTextColor={'white'} mainTextColor={'white'} />
      </div>
      <section className="mx-auto mt-8 max-w-[1210px]">
        <h1 className="text-3xl tracking-tight text-white">{heading}</h1>
        <p className="mt-1 font-semibold text-white">{description}</p>
      </section>
      <section className="mx-auto mt-8 flex max-w-[1300px] items-center justify-center bg-white p-14 dark:bg-gray-800">
        <div className="flex w-full">{children}</div>
      </section>
    </main>
  );
};

export default BodyComponent;
