"use client"
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";

const FAQ = () => {
    const [faqID, setFAQID] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>("general");

    const generalQuestions = [
        {
            id: 1,
            title: "My order didn't come. What should I do?",
            content: `We know this can be frustrating. You can always contact our customer care team and we'll investigate. But the good news is there are a few simple steps you can also take before placing the order to make sure it goes through successfully.

                        Take a look at the following steps:
                        • Make sure your Instagram profile is public, not private
                        • Double check you put in the right username (no typos)
                        • Don't change your username before you finish placing your order
                        • Ensure you haven't accidentally deleted your account
                        • Don't break any Instagram guidelines with your content
                        • Wait up to a day for delivery process to complete

                        Again, you can always contact our support team and we'll assist with checking our order records to confirm.`
        },
        {
            id: 2,
            title: "I'm worried my followers are dropping. Why is that?",
            content: "Instagram can be aggressive about marking users as spam and striking their accounts. This has the effect of reducing follower counts when the profiles go away. This is a rare occurrence so while it shouldn't happen to you, if it does within 30 days of when you placed your order we'll gladly refill your followers free of charge."
        },
        {
            id: 3,
            title: "I already purchased but no longer want the followers. Can you remove them?",
            content: "Every follower we deliver is from an authentic account. So because of this we can't make any transfers or removals post-delivery. Since you own your own account you can remove followers by blocking any individual user you choose on your own."
        },
        {
            id: 4,
            title: "I don't want any more follower replenishments. How do I stop it?",
            content: "Let us know if you'd prefer not to receive any replenishments to your account by sending an email to our support team."
        },
        {
            id: 5,
            title: "Let's say I still want replenishments though. How often can they occur?",
            content: "We will deliver them to your account daily (every 24 hrs) whenever we detect a drop in follower count."
        },
        {
            id: 6,
            title: "What happens if my Instagram is private during delivery?",
            content: "Sadly we won't be able to deliver the engagement services you've ordered if your profile is set to private. Please make sure it is public when you submit your order and provide us with your username. This way our team can engage with your content without any restrictions and you can start seeing an uptick in engagement volume immediately."
        },
        {
            id: 7,
            title: "Can I pick which posts or videos get the likes?",
            content: "Absolutely. We want to give you total control over the content you give a boost to. There will be plenty of space on the order page to enter in the link of the posts you want to target. If you don't have any particular posts in mind you can still order our services and our team will distribute the engagement naturally throughout your profile."
        },
        {
            id: 8,
            title: "How long does it take for the service to start working?",
            content: "Great question. It depends on the type and quantity of service you have ordered. For example 100k followers will take several days minimum as we spread the request throughout our network. But for smaller boosts like 500 likes or a few hundred views on a video you will start to see an impact immediately. Sometimes in as soon as a few minutes (but don't worry it is delivered authentically so as not to disrupt the algorithm)."
        },
        {
            id: 9,
            title: "Will using this get my account banned by Instagram?",
            content: "While we cannot control what Instagram decides to do at any point on their platform we have an incredibly high success rate and thousands of customers who have used our services without issue. As mentioned we drip engagement at natural rates so as to not set anything off track with your profile."
        },
        {
            id: 10,
            title: "Do I need to share my Instagram password?",
            content: "Not at all. We just need the username of your profile and any specific links. All public information and we will never access your account internally or put your sensitive info at risk. That means your DMs and any other private settings remain under lock and key. It is all still for your eyes only and our services are only intended to boost engagement from the outside."
        },
        {
            id: 11,
            title: "What if I accidentally entered the wrong username?",
            content: "Don't panic. Mistakes happen. If the username is for a profile that doesn't exist we won't be able to deliver the service anyways and will know a mistake was made. We will reach out to find the right username. If however the mistaken username is for a different active user you will have to reach out to our support team as soon as you notice the incorrect user was provided. We will work with you to come to a resolution and make sure you get the service you asked for."
        },
        {
            id: 12,
            title: "Will the followers dip over time?",
            content: "There will always be fluctuation on Instagram as users come and go. That is the nature of any social media platform. However our network is made up of verified users who have a track record of engaging on the platform over a consistent period of time. So the likelihood of removal is far less. That being said there can be changes in volume that can still happen. If it does we offer replenishment services should follower counts drastically be diminished."
        },
        {
            id: 13,
            title: "Can I use the service on more than one/multiple Instagram accounts?",
            content: "You definitely can. The more the merrier. Maybe you have a profile for your personal brand and one for a pet. There's no better way to spread the love than to order engagement services for each one of the accounts you own. All you have to do is place multiple orders back to back on our site or you can also add more than one to the same cart. And just be sure to specify the right username has been sent with each order. From there our team will go to work and deliver engagement on each of the profiles you have on Instagram."
        }
    ];

    const billingQuestions = [
        {
            id: 14,
            title: "How will the charge appear on my credit card statement?",
            content: "The charge will appear as 'LIKES.IO' or 'SOCIAL MEDIA SERVICES' on your credit card statement. We ensure discreet billing for all our customers while maintaining transparency with financial institutions."
        },
        {
            id: 15,
            title: "Is my payment information secure?",
            content: "Absolutely. We use industry-standard SSL encryption and comply with PCI DSS requirements to ensure your payment information is completely secure. We never store your full credit card details on our servers, and all transactions are processed through trusted payment processors with the highest security standards."
        },
        {
            id: 16,
            title: "What payment methods do you accept?",
            content: "We make things easy for our customers. Every major credit card including MasterCard, Visa, American Express, and Discover are accepted."
        },
        {
            id: 17,
            title: "What about PayPal?",
            content: "Unfortunately we no longer accept PayPal. We recommend a PayPal Prepaid MasterCard if you want to use your PayPal funds."
        },
        {
            id: 18,
            title: "I'm seeing a decline on my credit card. What now?",
            content: "First you should please contact your bank for more assistance. They will best be able to assist you in identifying the issue and resolving it. Our support team is still on standby if you have any additional problems."
        },
        {
            id: 19,
            title: "Can I get a refund?",
            content: "If you are not for any reason totally happy with what you received you can reach out to our team within 30 days of ordering and we'll do our best to make things right for you. In terms of refunds we adhere to our terms of service when making a decision so unfortunately a refund is not guaranteed. But if it is approved we will process it in 7-10 business days."
        }
    ];

    const isOpenFAQCompontn = (id: number) => {
        if (id === faqID) {
            setIsOpen(false);
            setFAQID(undefined);
        } else {
            setIsOpen(true);
            setFAQID(id);
        }
    };

    const currentQuestions = activeCategory === "general" ? generalQuestions : billingQuestions;

    return (
        <div>
            <Header />
            <section className="w-full flex justify-center mt-[130px]">
                <div className="w-full max-w-7xl flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-[#001F3F] text-center max-w-3xl px-4">
                            Find answers to common questions about our Instagram growth services
                        </p>
                    </div>
                    <div className="w-full px-4 sm:px-6 lg:px-8 md:mt-20 mt-10">
                        <div className="flex flex-col justify-center gap-y-5 lg:flex-row w-full">
                            <div className="w-full lg:w-[40%] flex items-center flex-col gap-3">
                                <button
                                    className={`w-52 px-6 py-3 rounded-lg ${activeCategory === "general"
                                            ? "text-white bg-gradient-to-r from-[#296FF9] to-[#59CEFC]"
                                            : "text-black border border-[#001F3F]"
                                        }`}
                                    onClick={() => setActiveCategory("general")}
                                >
                                    General Questions
                                </button>
                                <button
                                    className={`w-52 px-6 py-3 rounded-lg ${activeCategory === "billing"
                                            ? "bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white"
                                            : "text-black border border-[#001F3F]"
                                        }`}
                                    onClick={() => setActiveCategory("billing")}
                                >
                                    Billing & Payment
                                </button>
                            </div>
                            <div className="w-full lg:w-[60%] flex flex-col gap-3">
                                <div className="flex flex-col gap-2 w-full">
                                    {currentQuestions.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-[#001F3F] p-4 rounded-xl transition duration-500 lg:p-4 w-full bg-transparent"
                                        >
                                            <button
                                                className="flex items-center justify-between text-left text-lg font-medium leading-8 w-full"
                                                onClick={() => isOpenFAQCompontn(item.id)}
                                            >
                                                <h5 className="text-[#001F3F] pr-4">{item.title}</h5>
                                                <Image
                                                    src="assets/icon/plus.svg"
                                                    alt="Plus"
                                                    width={30}
                                                    height={30}
                                                    className={`transition-transform duration-300 ${isOpen && item.id === faqID ? "rotate-45" : ""
                                                        }`}
                                                />
                                            </button>
                                            <div
                                                className="w-full overflow-hidden transition-all duration-300 ease-in-out"
                                                style={{
                                                    maxHeight: isOpen && item.id === faqID ? "500px" : "0px",
                                                    opacity: isOpen && item.id === faqID ? 1 : 0,
                                                }}
                                            >
                                                <p className="text-base text-[#001F3F] font-medium leading-6 font-[system-ui] mt-4 whitespace-pre-line">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Support Section */}
                        <div className="mt-16 text-center">
                            <h3 className="text-xl font-semibold text-[#001F3F] mb-4">
                                Still have questions?
                            </h3>
                            <p className="text-[#001F3F] mb-6">
                                Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly support team.
                            </p>
                            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white font-medium hover:opacity-90 transition-opacity">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default FAQ;