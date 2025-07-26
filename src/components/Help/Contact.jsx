import { memo, useRef, useState } from "react";
import { toast } from "react-toastify";

const Contact = memo(() => {
  const formRef = useRef(null);
  const [errorIn, setErrorIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    query: "",
  });

  const fieldValuesHandler = (e) => {
    setFieldValues((prv) => ({
      ...prv,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    const name = fieldValues.name;
    const email = fieldValues.email;
    const message = fieldValues.query;

    if (name.length === 0 || name.length > 100) {
      setErrorIn("name");
      toast.info("Name must be between 1 and 100 characters.", {
        autoClose: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "medium",
        },
        progressClassName: "progress-style",
      });
      return;
    }

    if (email.length === 0 || email.length > 254 || !email.includes("@")) {
      setErrorIn("email");
      toast.info("Enter a valid email address.", {
        autoClose: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "medium",
        },
        progressClassName: "progress-style",
      });
      return;
    }

    if (message.length === 0 || message.length > 1000) {
      setErrorIn("query");
      toast.info("Message must be between 1 and 1000 characters.", {
        autoClose: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "medium",
        },
        progressClassName: "progress-style",
      });
      return;
    }

    const formData = new FormData(formRef.current);

    try {
      setLoading(true);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setLoading(false);
        toast.info("Message sent successfully!", {
          autoClose: 3000,
          style: {
            backgroundColor: "green",
            color: "white",
            fontWeight: "medium",
          },
          progressClassName: "progress-style",
        });

        setFieldValues({
          name: "",
          email: "",
          query: "",
        });
      } else {
        setLoading(false);
        toast.error("Failed to send message. Please try again later.", {
          autoClose: 3000,
          style: {
            color: "white",
            fontWeight: "medium",
          },
          progressClassName: "progress-style",
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (errorIn === e.target.name) setErrorIn("");
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

  return (
    <div className="basis-[75%] lg:pl-7 py-2 lg:py-7 text-black">
      <h1 className="text-[28px] dark:text-white font-bold tracking-tight mb-2 hidden lg:block">
        Contact Us
      </h1>
      <p className="text-[16px] mb-4 lg:mb-6 text-gray-700 dark:text-gray-200">
        Have any questions or inquiries? We'd love to hear from you.
      </p>

      <form
        ref={formRef}
        className="p-4 lg:p-5 border-[1px] border-primary w-[95%] lg:w-[70%] max-lg:mx-auto flex flex-col gap-2 rounded-xl"
      >
        <input
          type="hidden"
          name="access_key"
          value="21617fe9-bc5d-45cd-b274-eb68c7684cb9"
        ></input>
        <div className="relative mb-5">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            value={fieldValues.name}
            onChange={fieldValuesHandler}
            name="name"
            placeholder="Enter your name"
            className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border-[1px] ${errorIn === "name" ? "border-red-500" : "border-transparent"}`}
          />
          <p
            className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.name.length >= 100 ? "text-red-500" : "text-gray-600 dark:text-gray-300"
              }`}
          >{`${fieldValues.name.length}/100`}</p>
        </div>
        <div className="relative mb-5">
          <input
            type="email"
            onKeyDown={handleKeyDown}
            value={fieldValues.email}
            onChange={fieldValuesHandler}
            name="email"
            placeholder="Enter your email"
            className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border-[1px] ${errorIn === "email" ? "border-red-500" : "border-transparent"}`}
          />
          <p
            className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.email.length >= 254 ? "text-red-500" : "text-gray-600 dark:text-gray-300"
              }`}
          >{`${fieldValues.email.length}/254`}</p>
        </div>
        <div className="relative mb-5">
          <textarea
            name="query"
            onKeyDown={handleKeyDown}
            value={fieldValues.query}
            onChange={fieldValuesHandler}
            placeholder="Type your message..."
            className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md min-h-48 lg:min-h-60 border-[1px] ${errorIn === "query" ? "border-red-500" : "border-transparent"}`}
          ></textarea>
          <p
            className={`absolute right-1 text-xs font-medium ${fieldValues.query.length >= 1000
              ? "text-red-500"
              : "text-gray-600 dark:text-gray-300"
              }`}
          >{`${fieldValues.query.length}/1000`}</p>
        </div>

        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        ></input>
      </form>

      <button
        onClick={submitHandler}
        disabled={loading}
        className={`mt-6 py-2 px-6 max-lg:mx-auto font-semibold rounded-md border-[1px] ${loading ? "bg-gray-200 text-gray-400 border-gray-400" : "active:scale-95 hover:bg-primary bg-primary/90 border-primary dark:bg-darkPrimary text-white "} transition-transform ease-in-out duration-75 cursor-pointer flex items-center gap-2.5`}
      >
        Send Email
        {loading && <div className="mx-auto block border-4 border-t-black border-white animate-spin rounded-[50%] h-6 w-6"></div>}
      </button>
    </div>
  );
});

export default Contact;
