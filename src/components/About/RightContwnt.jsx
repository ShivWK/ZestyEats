import ReactMarkdown from "react-markdown"

const RightContent = ({ data }) => {

  return (
    <section className="basis-[74%] py-7 pl-5">
            <div className="bg-primary p-3">
              <p className="text-2xl font-bold tracking-tight text-white">{data.title}</p>
            </div>
            <div>
                <ReactMarkdown>{data.description}</ReactMarkdown>
            </div>
    </section>
  );
};

export default RightContent;
