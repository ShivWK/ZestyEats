const RightContent = ({ data }) => {
  return (
    <section className="basis-[74%] py-7 pl-5">
      <div className="bg-primary p-3">
        <p className="text-2xl font-bold tracking-tight text-white">
          {data.title}
        </p>
      </div>
      <div className="p-2">
        {data?.description &&
          data.description.map((item, index) => {
            return (
              <div
                className="mt-2"
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            );
          })}
        {data?.list?.mainList && (
          <ul className="list-disc ml-6 mt-2">
            {data.list.mainList.map((item, index) => (
              <li
                className="mt-1.5"
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
            {data?.list?.subList && (
              <ul className="list-[circle] ml-6">
                {data.list.subList.map((item, index) => (
                  <li
                    className="mt-1.5"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            )}
          </ul>
        )}
        {data?.lastDescription &&
          data.lastDescription.map((item, index) => {
            return (
              <div
                className="mt-2"
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            );
          })}
      </div>
    </section>
  );
};

export default RightContent;
