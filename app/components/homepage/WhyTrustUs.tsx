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
    { text: "Why " },
    { text: "Trust Us", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function WhyTrustUs() {
    return (
        <div className="flex items-center flex-col justify-center mt-24 w-full">
            <p className="lg:text-5xl md:text-[2rem] text-[2rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
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
                    <p className="text-start text-gray-600">We&lsquo;re not the kind of service your gut tells you to avoid. Here&lsquo;s what makes us different:</p>
                    <div className="w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg">
                        <p className="text-start text-gray-600 md:text-2xl text-lg">Authentic Engagement</p>
                        <p className="text-start text-gray-600 md:text-lg text-base">Every interaction comes from real users. Say goodbye to bots and ghost accounts.</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-4 rounded-2xl">
                        <p className="text-start text-gray-600 md:text-2xl text-lg">Safe and Secure</p>
                        <p className="text-start text-gray-600 md:text-lg text-base">We never ask for your password. Your account remains protected under lock and key.</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-4 rounded-2xl">
                        <p className="text-start text-gray-600 md:text-2xl text-lg">Lightning Fast Results</p>
                        <p className="text-start text-gray-600 md:text-lg text-base">Orders start processing within minutes. No waiting around to elevate your count.</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-4 rounded-2xl">
                        <p className="text-start text-gray-600 md:text-2xl text-lg">Affordable Plans</p>
                        <p className="text-start text-gray-600 md:text-lg text-base">On a tight budget? Looking to scale and ready to splurge? We&lsquo;ve got you covered either way.</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-4 rounded-2xl">
                        <p className="text-start text-gray-600 md:text-2xl text-lg">100% Satisfaction Guaranteed</p>
                        <p className="text-start text-gray-600 md:text-lg text-base">We aim to give our customers exactly what they want. Let us know if you&lsquo;re not pleased ever and we&lsquo;ll be sure to make it right.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyTrustUs;

