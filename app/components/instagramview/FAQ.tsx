"use client"
import Image from "next/image";
import { useState } from "react";

const ViewFAQ = () => {

    const [faqID, setFAQID] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const FAQComponent = [
        {
            id: 1,
            title: "Are these views from real people?",
            content: "Yes - every view you receive comes from a real, active Instagram user. We do not use bots or fake accounts, so your increased view count looks completely authentic (because it is!)."
        },
        {
            id: 2,
            title: "Is it safe to buy Instagram views?",
            content: "Absolutely. We take every precaution to keep your account safe. Since we don't require your password and deliver views in a natural pattern there's no risk to your Instagram account. Our service has been used by thousands of creators without any issues."
        },
        {
            id: 3,
            title: "How quickly will I get my views?",
            content: "Incredibly fast. Most orders start within 60 seconds of purchase. Smaller packages may finish in just a few minutes while larger orders might take a bit longer (to guarantee authenticity). Either way, you'll see your view count climbing very shortly after you order."
        },
        {
            id: 4,
            title: "Do I need to give you my Instagram password?",
            content: "No. We will never ask for your password or login credentials. All we need is the link to the video you want to promote. Your account remains completely under your control and protected."
        },
        {
            id: 5,
            title: "Will anyone know I bought views?",
            content: "No one will be able to tell. Purchased views simply add to your existing view count and are indistinguishable from regular views. We also keep your information confidential so your personal details are under lock and key."
        },
        {
            id: 6,
            title: "What if I have more questions or need help?",
            content: "We're here for you day and night. If anything comes up – whether you have a question before buying or need support after your purchase – you can reach out to us anytime. We're dedicated to making sure you get the most out of our service. Nothing makes us happier than seeing our customers satisfied."
        },
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
                        <h1 className="lg:text-3xl md:text-2xl text-xl font-[system-ui] font-[700] text-start text-[#001F3F]">Have Questions About Buying Instagram Views?</h1>
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

export default ViewFAQ;