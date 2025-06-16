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
    { text: "Who Can Benefit " },
    { text: "The Most?", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function BenefitTheMost() {
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
                    <ul className="text-start text-gray-600 list-disc pl-5">
                        <li><b>Creators & Influencers</b>: You&lsquo;ll build social proof faster and attract more brand deals.</li>
                        <li><b>Small Business Owners</b>: You&lsquo;ll get customers in the door and add to your bottom line.</li>
                        <li><b>Entrepreneurs</b>: You&lsquo;ll make a splash in the market and reach more eyes than ever.</li>
                        <li><b>Anyone Who&lsquo;s Tired of Being Overlooked</b>: It&lsquo;s time to level the playing field. You can have a hundred followers or a thousand but you deserve to have your voice heard.</li>
                    </ul>
                    <p className="text-start text-gray-600">These are pain points Insta users experience every single day. And we&lsquo;re here to change that.</p>
                </div>
            </div>
        </div>
    );
}

export default BenefitTheMost;

