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
    { text: "What Makes Us " },
    { text: "Different", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function Difference() {
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
                    <p className="text-start text-gray-600">Not all Instagram likes are the same. Some services use bots or fake accounts. These might bump up your numbers but can also damage your reputation—or even get your account flagged.</p>
                    <p className="text-start text-gray-600">Here’s what makes our service different:</p>
                    <ul className="text-start text-gray-600 list-disc pl-5">
                        <li>We use real Instagram users. Every like you receive comes from an active user. Not a bot.</li>
                        <li>Your likes arrive fast—and naturally. You’ll start seeing engagement almost immediately. But we pace the delivery so it doesn’t look suspicious.</li>
                        <li>Safe and secure. Our system is built with privacy in mind. All purchases are encrypted and handled with care.</li>
                        <li>Support around the clock. If you need help, we’re here. We respond quickly and won’t stop until you’re 100% satisfied.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Difference;
