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
    { text: "Stop Fighting the " },
    { text: "Algorithm", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
);

function StopFightingtheAlgorithm() {
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
                <div className="md:w-[80%] w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg text-base">
                    <p className="text-start text-gray-600">Social media shouldn&lsquo;t feel like a chore. It should be a platform you want to log into. Somewhere you can post your pictures and thoughts and get feedback in return.</p>
                    <p className="text-start text-gray-600">Nothing is more deflating than pouring your heart into content only for it to fall on deaf ears. No one wants to wake up and see no new followers.</p>
                    <p className="text-start text-gray-600">And say you&lsquo;re running a biz? Forget it. There&lsquo;s money on the line. Inventory to sell. Bills to pay. You want your Instagram images to reach as many people as humanly possible.</p>
                    <p className="text-start text-gray-600">This can mean the difference between running a successful operation and having to close your doors for good. So yes, engagement online matters. A lot.</p>
                    <p className="text-start text-gray-600">If you&lsquo;re feeling the pain from any of the below, our services are for you:</p>
                    <ul className="text-start text-gray-600 list-disc pl-5">
                        <li><b>No Engagement, No Visibility</b>: Instagram organically promotes content that already has traction. Without likes and views, you stay invisible.</li>
                        <li><b>Trust is Hard to Build</b>: People don&lsquo;t want to follow accounts with low numbers. Higher follower counts create a connection ASAP.</li>
                        <li><b>Constant Effort But Little Returny</b>: You&lsquo;re putting in the work but if your posts aren&lsquo;t reaching people, it&lsquo;s exhausting and has no ROI.</li>
                        <li><b>Missed Opportunities</b>: Brands and collaborators want to work with influencers who have social proof. Without it you&lsquo;re never getting that follower request or event invite.</li>
                    </ul>
                    <p className="text-start text-gray-600">These are pain points Insta users experience every single day. And we&lsquo;re here to change that.</p>
                </div>
            </div>
        </div>
    );
}

export default StopFightingtheAlgorithm;

