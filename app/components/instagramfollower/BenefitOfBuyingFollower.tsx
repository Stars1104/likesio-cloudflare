import Image from "next/image";
import React from "react";

const benefitsData = [
    {
        icon: "/assets/icon/Boosts Your Visibility.svg",
        title: "Increased Visibility",
        description: "Boost your post's visibility in Instagram's algorithm. When your posts receive more engagement through Followers, they're more likely to appear in users' feeds and explore pages, helping you reach a wider audience."
    },
    {
        icon: "/assets/icon/Builds Trust and Credibility.svg",
        title: "Build Social Proof",
        description: "Followers create social proof and make your content appear more authentic and engaging. This encourages other users to interact with your posts, creating a snowball effect of organic engagement."
    },
    {
        icon: "/assets/icon/Amplifies Your Social Proof.svg",
        title: "Enhanced Credibility",
        description: "A post with meaningful Followers appears more credible and trustworthy to potential followers. This helps establish your brand's authority and encourages more genuine interactions from your audience."
    }
];

function BenefitOfBuyingCom() {
    return (
        <div className="flex items-center flex-col justify-center mt-24 w-full px-2">
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
                    Instagram Followers
                </span>
            </p>

            <p className="text-start mt-12 lg:w-1/2 w-full text-gray-600 md:text-lg text-base">
                Instagram has nearly 2.5 billion active users, making it an incredibly
                powerful place to be seen. But with so many Instagram accounts uploading
                content every day, it&apos;s become an enormous challenge to have your posts
                seen on the social media platform. Buying affordably-priced Likes.io&apos;s IG
                followers triggers powerful organic growth for your account, letting you
                break out of the crowd, earn more exposure, and become popular on the
                Gram.
            </p>

            <div className="mt-24 lg:px-24 flex w-full flex-wrap items-center justify-center md:flex-row text-[#001F3F] gap-4">
                {benefitsData.map((benefit, index) => (
                    <div key={index} className="lg:w-1/4 h-[25rem] w-full bg-white border rounded-lg shadow-lg flex items-center justify-center flex-col">
                        <Image
                            alt={`${benefit.title} icon`}
                            width={64}
                            height={64}
                            src={benefit.icon}
                            className="h-16 w-16 my-6"
                        />
                        <p className="w-full md:text-xl text-lg md:text-center md:p-0 px-4 text-start">
                            {benefit.title}
                        </p>
                        <p className="md:text-lg text-sm md:p-8 p-4 text-start">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BenefitOfBuyingCom;