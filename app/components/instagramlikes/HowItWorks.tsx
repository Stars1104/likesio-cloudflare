"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HowItWork {
  id: number,
  title: string,
  content: string,
  icon: string
}

function HowItWorks() {

  const [howItWork, setHowItWork] = useState<HowItWork[]>([]);

  useEffect(() => {
    setHowItWork([
      {
        id: 1,
        title: "Choose Package",
        content: "We offer different options based on how many likes you want. Looking for a small short-term boost? Want a larger push for a special occasion? Thereu’s a package just for you.",
        icon: "/assets/icon/Select a Package.svg"
      },
      {
        id: 2,
        title: "Share Your Post Link",
        content: "Copy the link to the Instagram post you are focusing on (just the URL is fine). That’s all we need to get started.",
        icon: "/assets/icon/Enter Your Instagram Video URL.svg"
      },
      {
        id: 3,
        title: "Place Your Order",
        content: "Use our secure checkout. We accept credit cards, debit, PayPal, and crypto. Your info stays safe.",
        icon: "/assets/icon/Secure Checkout.svg"
      },
      {
        id: 4,
        title: "Watch the Likes Roll In",
        content: "You’ll start seeing likes appear on your post within minutes. Most orders are completed the same day.",
        icon: "/assets/icon/Instant Delivery Begins.svg"
      }
    ])
  }, [])

  return (
    <div className="flex items-center flex-col justify-center mt-24 w-full">
      <p className="lg:text-5xl md:text-[2rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
        How It{" "}
        <span
          style={{
            background: "linear-gradient(45deg, #fabf58 13%, #f59252 40%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Works
        </span>
      </p>

      <div className="max-w-[90rem] w-full md:mt-24 mt-12 px-2 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 flex-col place-content-center place-items-center text-gray-600 gap-4">
        {
          howItWork.map((item, index) => (
            <div key={index} className="w-full bg-white border rounded-lg shadow-lg flex items-center flex-col p-6 h-[25rem]">
              <Image alt="Img" width={64} height={64} src={item.icon} className="h-16 w-16 my-6" />
              <p className="md:text-xl text-lg w-full md:text-center text-start">{item.title}</p>

              <p className="md:text-lg text-sm text-start mt-6">
                {item.content}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default HowItWorks;