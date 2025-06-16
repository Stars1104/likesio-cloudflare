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
                title: "Provide Your Details",
                content: "No passwords. No hidden credentials. Just your Instagram URL and we’re off to the races.",
                icon: "/assets/icon/Enter Your Instagram Video URL.svg"
            },
            {
                id: 3,
                title: "Watch the Growth",
                content: "You’ll start seeing results flow through in minutes. (Yes, we work that fast.)",
                icon: "/assets/icon/monitor.svg"
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

            <div className="max-w-7xl w-full md:mt-24 mt-12 px-2 flex flex-col justify-center items-center text-gray-600 gap-4">
                <div className="md:w-[80%] w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg">
                    <p className="text-start text-gray-600">It&lsquo;s ridiculously simple to grow your Instagram page:</p>
                </div>
            </div>

            <div className="max-w-[90rem] w-full md:mt-24 mt-12 px-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 flex-col place-content-center place-items-center text-gray-600 gap-4">
                {
                    howItWork.map((item, index) => (
                        <div key={index} className="w-full bg-white border rounded-lg shadow-lg flex items-center flex-col p-6 h-[25rem]">
                            <Image alt="Img" width={64} height={64} src={item.icon} className="h-16 w-16 my-6" />
                            <p className="text-xl w-full md:text-center text-start">{item.title}</p>

                            <p className="text-lg text-start mt-6">
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