"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BenefitsType {
  id: number,
  title: string,
  content: string,
  icon: string
}

function BenefitOfBuyingView() {

  const [benefits, setBenefits] = useState<BenefitsType[]>([]);

  useEffect(() => {
    setBenefits([
      {
        id: 1,
        title: "Instant Delivery",
        content: "Watch your view count climb within minutes of placing an order. Timing is everything on Instagram – our lightning-fast delivery gives your content the quick boost it needs (when it matters most).",
        icon: "/assets/icon/service-hours.svg"
      },
      {
        id: 2,
        title: "Real Views from Real People",
        content: "Credibility counts. We deliver views from genuine Instagram users – no bots, no fake accounts – to keep your engagement authentic and your reputation intact.",
        icon: "/assets/icon/monitor.svg"
      },
      {
        id: 3,
        title: "Safe & Secure",
        content: "Your account's safety is our priority. We never ask for your password or any private details, and our delivery methods are designed to be indistinguishable from organic activity – keeping your account 100% safe.",
        icon: "/assets/icon/insurance-policy.svg"
      },
      {
        id: 3,
        title: "24/7 Customer Support",
        content: "Questions or concerns? Our friendly support team is available around the clock. Whether you need help selecting a package or have an issue with your order, we're here to assist you at any time.",
        icon: "/assets/icon/call-center.svg"
      },
      {
        id: 4,
        title: "Flexible Packages for All Needs",
        content: "Whether you're looking to add 500 views or 50,000+ we have a range of packages to fit your goals and budget. Scale your order to exactly what you need, when you need it.",
        icon: "/assets/icon/delivery.svg"
      },
      {
        id: 5,
        title: "Guaranteed Results",
        content: "We stand behind our service. If we fail to deliver your views as promised we'll refund your purchase – guaranteed.",
        icon: "/assets/icon/trophy.svg"
      }
    ])
  }, [])

  return (
    <div className="flex items-center flex-col justify-center   w-full px-2">
      <p className="lg:text-5xl md:text-[2.3rem] text-[1.6rem] font-[system-ui] font-[700] md:text-center text-[#001F3F] text-start">
        Benefits of Buying{" "}
        <span
          style={{
            background: "linear-gradient(45deg, #fabf58 13%, #f59252 40%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Instagram Views
        </span>
      </p>

      <p className="text-start mt-12 md:w-[40%] w-full text-gray-600 md:text-lg text-base">
        Even great videos can struggle to get noticed. Boosting your view count provides vital social proof that draws more people to watch and engage.
        Gram.
        We make this easy by combining quality with affordability. Here are some of the key benefits you can expect:
      </p>

      <div className="mt-24 lg:px-24 flex w-full flex-wrap items-center justify-center md:flex-row text-[#001F3F] gap-4">
        {
          benefits.map((item, index) => (
            <div key={index} className="lg:w-1/4 w-full bg-white border rounded-lg shadow-lg flex items-center justify-center flex-col h-[25rem]">
              <Image alt="Img" width={64} height={64} src={item.icon} className="h-16 w-16 my-6" />
              <p className="w-full md:text-xl md:text-center md:p-0 px-4 text-start">{item.title}</p>

              <p className="md:text-lg text-sm md:p-8 p-4 text-start">{item.content}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default BenefitOfBuyingView;