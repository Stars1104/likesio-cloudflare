"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface WhyChooseFollower {
    id: number,
    title: string,
    content: string,
    icon: string
}


function WhyChooseComment() {

    const [chooseFollower, setChooseFollower] = useState<WhyChooseFollower[]>([]);

    useEffect(() => {
        setChooseFollower([
            {
                id: 1,
                title: "Instant Delivery",
                content: "Don't wait weeks or even days for your account to grow. With our advanced delivery system your new followers start appearing on your profile within minutes.You can expect concrete results that jump- start your social standing ASAP.",
                icon: "/assets/icon/service-hours.svg"
            },
            {
                id: 2,
                title: "High-Quality, Real Followers",
                content: "Forget about fake accounts. Every follower we deliver is a real active Instagram user.This authenticity not only builds trust with your audience.It also nudges Instagram's algorithm in your favor. This in turn helps you climb the popularity ladder faster.",
                icon: "/assets/icon/High-quality, real views.svg"
            },
            {
                id: 3,
                title: "Around-the-Clock Customer Support",
                content: "We get it: questions can pop up at any time. Our mission is to make sure you get the help you need, whenever you need it.No matter if you have a general concern or a specific support request we are here to lend a hand at every turn.",
                icon: "/assets/icon/call-support.svg"
            },
            {
                id: 4,
                title: "No Password Needed",
                content: "Your security is our top priority. We never ask for your Instagram password, just the public link to your profile.You can rest assured our platform is secured with state - of - the - art encryption technology for maximum protection.Your personal data is always protected with us by your side.",
                icon: "/assets/icon/No password required.svg"
            },
            {
                id: 5,
                title: "A Track Record of Satisfaction",
                content: "With years of experience under our belts we've built a reputation for delivering superior social media growth around the world.Our satisfied customers(ranging from influencers to up- and - coming brands) trust us to deliver authentic followers that drive opportunities online.",
                icon: "/assets/icon/Trusted since 2014.svg"
            },
        ])
    }, [])

    return (
        <div className="flex items-center flex-col justify-center mt-24 w-full">
            <p className="lg:text-5xl md:text-[2rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                Why Choose Us To Buy{" "}
                <span
                    style={{
                        background: "linear-gradient(45deg, #fabf58 13%, #f59252 40%)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Instagram Comments?
                </span>
            </p>

            <div className="md:mt-24 mt-14 lg:px-24 px-2 flex w-full flex-wrap items-center justify-center md:flex-row text-[#001F3F] gap-4 ">
                {
                    chooseFollower.map((item, index) => (
                        <div key={index} className="lg:w-1/4 w-full bg-white border rounded-lg shadow-lg flex items-center justify-center flex-col px-4 h-[25rem]">
                            <Image alt="Img" width={64} height={64} src={item.icon} className="h-16 w-16 my-6" />
                            <p className="md:text-xl text-base w-full md:text-center text-start">{item.title}</p>
                            <p className="md:text-lg text-sm text-start py-4">{item.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default WhyChooseComment;
