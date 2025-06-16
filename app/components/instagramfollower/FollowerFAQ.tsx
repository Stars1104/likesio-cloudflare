"use client"
import Image from "next/image";
import { useState } from "react";

const FollowerFAQ = () => {
    const [faqID, setFAQID] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const FAQComponent = [
        {
            id: 1,
            title: "Are these followers genuine?",
            content: "Absolutely.Every follower you receive is an active Instagram user.We steer clear of bots and fake accounts.With us, your follower boost looks natural and sustainable(because it is)."
        },
        {
            id: 2,
            title: "Is it safe to buy Instagram followers from you?",
            content: "Yes. We use secure methods to deliver your followers safely. Since we never ask for your password and only use approved delivery techniques your account remains completely secure."
        },
        {
            id: 3,
            title: "How fast will I see results?",
            content: "Our delivery system is designed for speed. Most orders begin processing within minutes. For larger packages the process might take a bit longer, but you can rest assured that your followers are on their way."
        },
        {
            id: 4,
            title: "What if I encounter any issues?",
            content: "We offer unparalleled customer support. Our team is available night and day to help with any concerns. If anything isn't right with your order reach out to us and we'll make it right immediately."
        },
        {
            id: 5,
            title: "Can I combine this service with other engagement boosts?",
            content: "Absolutely. Many of our clients choose to maximize their growth by combining follower boosts with other services like video views or comments. We are here to help craft the perfect solution for your Instagram profile."
        }
    ]

    const isOpenFAQCompontn = (id: number) => {

        if (id === faqID) setIsOpen(false);
        else if (id !== faqID) setIsOpen(true);

        setFAQID(id);
    }

    return (
        <section className="pt-24 w-full max-w-7xl">
            <div className="flex flex-col justify-center items-center gap-4 w-full px-2">
                <h1 className="w-full lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] sm:text-center text-start text-[#001F3F]">Frequently Asked Questions</h1>
            </div>
            <div className="w-full sm:px-6 lg:px-8 px-2 md:mt-20 mt-10">
                <div className="flex flex-col justify-center gap-y-5 lg:flex-row w-full">
                    <div className="w-full lg:w-[40%] flex flex-col gap-3">
                        <h1 className="lg:text-3xl md:text-2xl text-xl font-[system-ui] font-[700] text-start text-[#001F3F]">Have Questions About Buying Instagram Followers?</h1>
                    </div>
                    <div className="w-full lg:w-[60%] flex flex-col gap-3">
                        <div className="flex flex-col gap-2 w-full">
                            {
                                FAQComponent.map((item, index) => (
                                    <div key={index} className="border border-[#001F3F] p-4 rounded-xl hover:bg-gray-200 transition duration-500 lg:p-4 w-full bg-transparent">
                                        <button className="flex items-center justify-between text-left text-lg leading-8 w-full">
                                            <h5 className="text-[#001F3F]">{item.title}</h5>
                                            <Image src="assets/icon/plus.svg" alt="Plus" width={30} height={30} className={`transition-transform duration-300 ${isOpen && item.id === faqID ? "rotate-45" : ""}`} onClick={() => isOpenFAQCompontn(item.id)} />
                                        </button>
                                        <div className="w-full overflow-hidden transition-all duration-300 ease-in-out"
                                            style={{
                                                maxHeight: isOpen ? `250px` : "0px",
                                            }}>
                                            {
                                                item.id === faqID
                                                    ? <p className="text-base text-[#001F3F] leading-6 font-[system-ui]">{item.content}</p>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default FollowerFAQ;