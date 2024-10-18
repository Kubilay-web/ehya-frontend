import React, { useState } from "react";
import { images } from "../../../constants";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false); // Mesajın görünürlük durumu

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscription = async () => {
    if (!email || !isValidEmail(email)) {
      setMessage("Please enter valid email");
      setEmail("");
      setIsMessageVisible(true);
      // 5 saniye sonra mesajı gizle
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Successful subscribed!");
        setIsMessageVisible(true);
        setEmail(""); // Başarı durumunda girişi temizle

        // 5 saniye sonra mesajı gizle
        setTimeout(() => {
          setIsMessageVisible(false);
        }, 5000);
      } else {
        setMessage("Already subscribed");
        setEmail("");
        setIsMessageVisible(true);

        setTimeout(() => {
          setIsMessageVisible(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Please try again.");
      setEmail("");
      setIsMessageVisible(true);

      setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);
    }
  };

  return (
    <>
      <svg
        className="h-auto max-h-40 w-full translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>

      <section className="relative bg-dark-hard px-5">
        <div className="container mx-auto grid grid-cols-12 py-10 md:pb-20 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="font-roboto text-2xl font-bold text-white md:text-center md:text-4xl md:leading-normal lg:text-left">
              Get our stories delivered From us to your inbox weekly.
            </h2>
            <div className="mx-auto mt-12 w-full max-w-[494px] space-y-3 md:flex md:items-center md:space-y-0 md:space-x-2 lg:mx-0">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-4 py-3 placeholder:text-dark-light"
                placeholder="Your Email"
              />
              <button
                className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-white md:w-fit md:whitespace-nowrap"
                onClick={handleSubscription}
              >
                Get started
              </button>
            </div>
            {isMessageVisible && (
              <p className="mt-6 text-sm leading-7 text-dark-light md:text-center md:text-base lg:text-left">
                {message}
              </p>
            )}
          </div>
          <div className="col-span-12 mb-[70px] hidden md:order-first md:block lg:order-last lg:col-span-6">
            <div className="relative mx-auto w-3/4">
              <div className="absolute top-[10%] -right-[8%] h-1/2 w-1/2 rounded-lg bg-[#FC5A5A]" />
              <div className="absolute -bottom-[10%] -left-[8%] h-1/2 w-1/2 rounded-lg bg-white opacity-[.06]" />
              <div className="relative z-[1] w-full rounded-xl bg-white p-3">
                <img
                  src={images.CtaImage}
                  alt="title"
                  className="h-auto w-full object-cover object-center md:h-52 lg:h-48 xl:h-60"
                />
                <div className="p-5">
                  <h2 className="font-roboto text-xl font-bold text-dark-soft md:text-2xl lg:text-[28px]">
                    Future of Work
                  </h2>
                  <p className="mt-3 text-sm text-dark-light md:text-lg">
                    Majority of people will work in jobs that don’t exist today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
