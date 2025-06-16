"use client"
import Image from "next/image";
import { useState } from "react";

const LikeFAQ = () => {

    const [faqID, setFAQID] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const FAQComponent = [
        {
            id: 1,
            title: "Will people know I bought likes?",
            content: "No. Since these are real users the likes blend right in. There's no obvious way for someone to tell you bought them."
        },
        {
            id: 2,
            title: "Will buying likes help my post reach more people?",
            content: "Yes! Instagram's algorithm favors posts with higher engagement. More likes mean better visibility in feeds, explore pages, and hashtags, potentially leading to organic growth."
        },
        {
            id: 3,
            title: "How fast is the delivery?",
            content: "Most orders start within minutes. Full delivery depends on the package size but even larger orders are usually completed within a few hours."
        },
        {
            id: 4,
            title: "Can I split likes across different posts?",
            content: "Yes, you can split your likes across multiple posts. Just select the number of likes you want for each post in the order form."
        },
        {
            id: 5,
            title: "Do you offer automatic likes for every new post?",
            content: "No, we don't offer automatic likes for every new post. We only offer manual likes for specific posts you select."
        },
        {
            id: 6,
            title: "What if I need help with my likes order?",
            content: "If you have any questions or need assistance with your likes order, our support team is here to help. You can contact us via email or live chat."
        },
    ]

    const isOpenFAQCompontn = (id: number) => {

        if (id === faqID) setIsOpen(false);
        else if (id !== faqID) setIsOpen(true);

        setFAQID(id);
    }

    return (
        <section className="pt-24 w-full max-w-7xl">
            <div className="flex flex-col justify-center items-center gap-4 w-full">
                <h1 className="w-full lg:text-[3.2rem] md:text-[2rem] text-[1.4rem] font-[system-ui] font-[700] text-center text-[#001F3F]">Frequently Asked Questions</h1>
            </div>
            <div className="w-full sm:px-6 lg:px-8 px-2 md:mt-20 mt-10">
                <div className="flex flex-col justify-center gap-y-5 lg:flex-row w-full">
                    <div className="w-full lg:w-[40%] flex flex-col gap-3">
                        <h1 className="lg:text-3xl md:text-2xl text-lg font-[system-ui] md:font-[700] text-start text-[#001F3F]">Have Questions About Buying Instagram Likes?</h1>
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

export default LikeFAQ;