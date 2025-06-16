"use client"
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface TitlePart {
    text: string;
    isGradient?: boolean;
}

const gradientStyle = {
    background: "linear-gradient(45deg, #fabf58 13%, #f59252 40%)",
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
} as const;

const titleParts: TitlePart[] = [
    { text: "Why Work " },
    { text: "With Us", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function WhyWorkWithUs() {
    return (
        <div className="flex items-center flex-col justify-center mt-24 w-full">
            <p className="lg:text-5xl md:text-[2rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                {titleParts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part.isGradient ? (
                            <GradientText text={part.text} />
                        ) : (
                            <RegularText text={part.text} />
                        )}
                    </React.Fragment>
                ))}
            </p>

            <div className="max-w-7xl w-full md:mt-24 mt-12 px-2 flex flex-col justify-center items-center text-gray-600 gap-4">
                <div className="md:w-[80%] w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg">
                    <p className="text-start text-gray-600">We offer real followers and views from actual users. No blank profiles. No smoke and mirrors. Just the push you need to get your content noticed.</p>
                    <p className="text-start text-gray-600">Here&lsquo;s what you can expect with us:</p>
                    <ul className="text-start text-gray-600 list-disc pl-5">
                        <li><b>Bigger Numbers</b>: Engagement fuels the algorithm. With more likes and views your content has a better chance of going viral.</li>
                        <li><b>More Instagram Cred</b>: Higher follower counts build trust. People are way more likely to follow accounts that others are already paying attention to.</li>
                        <li><b>Real Opportunities Your Way</b>: Land partnerships and monetize your influence with brand deals that wouldn&apos;t have happened otherwise.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default WhyWorkWithUs;

