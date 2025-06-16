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
                title: "Select a Package",
                content: "Choose the number of Instagram followers you want. We offer multiple options so you can pick the perfect package for your needs.",
                icon: "/assets/icon/Select a Package.svg"
            },
            {
                id: 2,
                title: "Enter Your Instagram Video URL",
                content: "Provide the link to the Instagram video (or Reel) you want to boost. No login or password required – just the URL of your post.",
                icon: "/assets/icon/Enter Your Instagram Video URL.svg"
            },
            {
                id: 3,
                title: "Secure Checkout",
                content: "Complete your purchase through our secure payment process. Your information is protected with encryption and we support all major payment methods.",
                icon: "/assets/icon/Secure Checkout.svg"
            },
            {
                id: 4,
                title: "Instant Delivery Begins",
                content: "Once your order is confirmed our system kicks in. You'll typically start seeing your view count increase within minutes. We deliver the followers quickly and naturally until your order is fulfilled.",
                icon: "/assets/icon/Instant Delivery Begins.svg"
            },
            {
                id: 5,
                title: "Enjoy the Results",
                content: "Sit back and watch your video's view count accelerate. Higher followers attract more organic viewers and engagement. And if you have any questions at any point our 24/7 support team is one click away.",
                icon: "/assets/icon/Enjoy the Results.svg"
            },
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

            <p className="lg:w-[50%] w-full md:text-xl text-base text-start py-4 px-4">
                Getting more Instagram followers is as straightforward as it gets. Just follow these simple steps:
            </p>

            <div className="max-w-7xl w-full md:mt-24 mt-12 px-2 grid md:grid-cols-3 grid-cols-1 flex-col place-content-center place-items-center text-gray-600 gap-4">
                {
                    howItWork.map((item, index) => (
                        <div key={index} className="w-full bg-white border rounded-lg shadow-lg flex items-center justify-center flex-col p-6 h-[25rem]">
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