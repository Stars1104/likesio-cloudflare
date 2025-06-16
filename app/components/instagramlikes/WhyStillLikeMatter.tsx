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
    { text: "Why Likes Still " },
    { text: "Matter", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function Difference() {

    const content = [
        {
            contents: "There’s been chatter that likes don’t matter as much anymore. But let’s be honest: they do."
        },
        {
            contents: "Likes still play a big role in how Instagram decides what content to push. Posts with more engagement show up more often in feeds. They pop up on Explore pages and in hashtag results with more visibility."
        },
        {
            contents: "A good amount of likes make people pause. It makes your post worth noticing—and people are more likely to engage with popular things. That's just how the internet works."
        },
        {
            contents: "Buying likes can kickstart a cycle of growth. Here’s what happens: You buy likes. Your post gets seen by more people. Those people engage organically. Your reach grows naturally."
        },
        {
            contents: "It’s a proven snowball effect that you can use to your advantage."
        }
    ]

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
                    {
                        content.map((item, index) => (
                            <p key={index} className="text-start text-gray-600">{item.contents}</p>

                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Difference;
