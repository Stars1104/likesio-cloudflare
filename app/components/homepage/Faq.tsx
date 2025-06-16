"use client"
import Image from "next/image";
import { useState } from "react";

const FAQ = () => {

    const [faqID, setFAQID] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const FAQComponent = [
        {
            id: 1,
            title: "Will this get my account banned?",
            content: "Nope. Our service only uses safe proven methods that comply with Instagram’s guidelines."
        },
        {
            id: 2,
            title: "How soon will I see results?",
            content: "You’ll notice growth in minutes. Some larger orders can take a bit longer to process."
        },
        {
            id: 3,
            title: "Are the followers real?",
            content: "Absolutely. Every interaction comes from a real user. No bots or fakes."
        },
        {
            id: 4,
            title: "What if I’m not satisfied?",
            content: "We offer a satisfaction guarantee. If you’re unhappy for any reason we’ll make it right."
        },
        {
            id: 5,
            title: "Do I have to give you my password?",
            content: "Never. We only need your username/post URLto get started."
        },
        {
            id: 6,
            title: "Will people know I bought followers?",
            content: "Nope. Our growth looks completely organic. Because it is. No one will know but you."
        },
        {
            id: 7,
            title: "What payment methods do you accept?",
            content: "We accept all major credit and debit cards, Paypal and crypto. Checkout is secure and easy."
        },
        {
            id: 8,
            title: "Can I customize my order?",
            content: "Most definitely. Choose what works for you, and we’ll handle the rest."
        },
        {
            id: 9,
            title: "Is my account information safe?",
            content: "It is. We put your privacy first with premium safety measures in place at all times."
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
                <h1 className="w-full lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] sm:text-center text-start text-[#001F3F]">FAQs — Let’s Answer Your Questions</h1>
            </div>
            <div className="w-full sm:px-6 lg:px-8 px-2 md:mt-20 mt-10">
                <div className="flex flex-col justify-center gap-y-5 lg:flex-row w-full">
                    <div className="w-full lg:w-[40%] flex flex-col gap-3">
                        <h1 className="lg:text-3xl md:text-2xl text-xl font-[system-ui] font-[700] text-start text-[#001F3F]">Have Questions About Likes.io Services?</h1>
                    </div>
                    <div className="w-full lg:w-[60%] flex flex-col gap-3">
                        <div className="flex flex-col gap-2 w-full">
                            {
                                FAQComponent.map((item, index) => (
                                    <div key={index} className="border border-[#001F3F] p-4 rounded-xl hover:bg-gray-200 transition duration-500 lg:p-4 w-full bg-transparent">
                                        <button className="flex items-center justify-between text-left md:text-lg text-base leading-8 w-full">
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

export default FAQ;