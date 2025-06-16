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
  { text: "Why People Buy " },
  { text: "Instagram Likes", isGradient: true }
];

const GradientText: React.FC<{ text: string }> = ({ text }) => (
  <span style={gradientStyle}>{text}</span>
);

const RegularText: React.FC<{ text: string }> = ({ text }) => (
  <span>{text}</span>
);

function WhyChooseLikesIO() {
  return (
    <div className="flex items-center flex-col justify-center   w-full">
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
          <p className="text-start text-gray-600">It&lsquo;s not just about the numbers. It&lsquo;s about what those numbers signal.</p>
          <p className="text-start text-gray-600">A post with 12 likes looks like it&lsquo;s been missed. A post with 1,200 likes feels popular. People are more likely to stop and pay attention when they see others are already engaging with your content. It&lsquo;s called social proof—and it plays a big role on Instagram.</p>
          <p className="text-start text-gray-600">That&lsquo;s why brands, influencers, creators, and everyday users choose to buy likes. It&lsquo;s a smart way to stand out and get more from the content you&lsquo;re already creating.</p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseLikesIO;
