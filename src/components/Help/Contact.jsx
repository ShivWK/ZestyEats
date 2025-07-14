import { memo, useState } from "react";

const Contact = memo(() => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      query: ""
    })

    const formDataHandler = (e) => {
        setFormData(prv => ({
          ...prv,
          [e.target.name] : e.target.value,
        }))        
    }

    return <div className="basis-[75%] lg:pl-7 py-2 lg:py-7 text-black">
      <h1 className="text-[28px] font-bold tracking-tight mb-2 hidden lg:block">Contact Us</h1>
      <p className="text-[16px] mb-4 lg:mb-6 text-gray-700">
        Have any questions or inquiries? We'd love to hear from you.
      </p>

      {/* <div className="flex items-center gap-2">
        <span className="text-[16px] font-medium">Email:</span>
        <a
          href="mailto:shivendrawk@gmail.com"
          className="text-primary underline hover:text-primary/80"
        >
          zestyeatswk@gmail.com
        </a>
      </div> */}

      <form action="" className="p-4 lg:p-5 border-[1px] border-primary w-[95%] lg:w-[70%] max-lg:mx-auto flex flex-col gap-2 rounded-xl">
        <div className="relative mb-5">
          <input type="text" value={formData.name} maxLength={100} onChange={formDataHandler} name="name" placeholder="Enter your name" className="w-full bg-gray-100 p-3 outline-none px-4 rounded-md"/>
          <p className={`absolute right-1 text-xs font-medium mt-1 ${formData.name.length === 100 ? "text-red-500" : "text-gray-600"}`}>{`${formData.name.length}/100`}</p>
        </div>
        <div className="relative mb-5">
          <input type="email" value={formData.email} onChange={formDataHandler} maxLength={254} name="email" placeholder="Enter your email" className="w-full bg-gray-100 p-3 outline-none px-4 rounded-md" />
          <p className={`absolute right-1 text-xs font-medium mt-1 ${formData.email.length === 254 ? "text-red-500" : "text-gray-600"}`}>{`${formData.email.length}/254`}</p>
        </div>
       <div className="relative mb-5">
         <textarea name="query" value={formData.query} onChange={formDataHandler} placeholder="Type your message..." maxLength={1000} className="w-full bg-gray-100 p-3 outline-none px-4 rounded-md  min-h-48 lg:min-h-60"></textarea>
         <p className={`absolute right-1 text-xs font-medium ${formData.query.length === 1000 ? "text-red-500" : "text-gray-600"}`}>{`${formData.query.length}/1000`}</p>
       </div>
      </form>

      <button className="mt-6 py-1 px-5 lg:py-2 lg:px-6 max-lg:mx-auto bg-primary text-white font-semibold rounded-md hover:bg-primary/90 active:scale-95 transition-transform ease-in-out duration-75 cursor-pointer block">
        <a href="mailto:zestyeatswk@gmail.com">Send Email</a>
      </button>
    </div>
});

export default Contact;