import { memo } from "react";

const Contact = memo(() => {
    return <div className="basis-[75%] pl-7 py-7 text-black">
      <h1 className="text-[28px] font-bold tracking-tight mb-2">Contact Us</h1>
      <p className="text-[16px] mb-6 text-gray-700">
        Have any questions or inquiries? We'd love to hear from you.
      </p>

      <div className="flex items-center gap-2">
        <span className="text-[16px] font-medium">Email:</span>
        <a
          href="mailto:shivendrawk@gmail.com"
          className="text-primary underline hover:text-primary/80"
        >
          zestyeatswk@gmail.com
        </a>
      </div>

      <button className="mt-6 py-2 px-6 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 active:scale-95 transition-transform ease-in-out duration-100 cursor-pointer">
        <a href="mailto:zestyeatswk@gmail.com">Send Email</a>
      </button>
    </div>
});

export default Contact;