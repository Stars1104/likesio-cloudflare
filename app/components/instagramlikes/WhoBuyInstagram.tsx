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
    { text: "Who Buying Instagram " },
    { text: "Likes Is For", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function WhoBuyInstagram() {
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
                    <p className="text-start text-gray-600">Buying Instagram likes isn’t just for influencers chasing brand deals. It’s also for:</p>
                    <ul className="text-start text-gray-600 list-disc pl-5">
                        <li>Creators who want more people to see their content</li>
                        <li>Small businesses trying to reach new customers</li>
                        <li>New accounts looking to gain traction</li>
                        <li>People promoting in-person events or gatherings</li>
                        <li>Anyone who wants their content to reach more eyes</li>
                    </ul>
                    <p className="text-start text-gray-600">If you’ve ever posted something and thought, &quot;More people should see this&quot; then you’re in the right spot.</p>
                </div>
            </div>
        </div>
    );
}

export default WhoBuyInstagram;
