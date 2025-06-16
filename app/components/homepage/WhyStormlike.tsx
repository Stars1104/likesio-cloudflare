"use client"
import Image from "next/image";

const WhyStormLike = () => {
    return (
        <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-24">
            <div className="flex flex-col justify-center items-center gap-4 w-full px-2">
                <h1 className="w-full lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] sm:text-center text-start text-[#001F3F]">So, why Likes.io?</h1>
                <span className="md:w-[40%] w-full font-[system-ui] text-lg md:text-center text-start text-[#001F3F]">
                    Besides being the only platform to provide real likes, views and
                    followers, we are customizable and offer prices no one else can match.</span>
            </div>
            <div className="md:w-[85%] w-full mt-8 flex lg:flex-row flex-col justify-center items-center lg:gap-10 gap-4 md:px-0 px-2">
                <div className="lg:w-[32%] h-[20rem] w-full flex flex-col justify-center hover:bg-gray-200 items-center p-4 border gap-4 rounded-2xl border-[#001F3F] transition duration-300 cursor-pointer">
                    <Image src="assets/icon/instant.svg" width={100} height={100} alt="Plane" />
                    <span className="text-2xl font-[system-ui] text-[#001F3F] font-medium w-full">Instant delivery</span>
                    <span className="font-[system-ui] text-[#001F3F] text-lg font-[400]">Speed matters. Place your order and watch your likes, views or followers grow!</span>
                </div>
                <div className="lg:w-[32%] h-[20rem] w-full flex flex-col justify-center hover:bg-gray-200 items-center p-4 border gap-4 rounded-2xl border-[#001F3F] transition duration-300 cursor-pointer">
                    <Image src="assets/icon/real.svg" width={100} height={100} alt="Plane" />
                    <span className="text-2xl font-[system-ui] text-[#001F3F] font-medium w-full">100% real. Always.</span>
                    <span className="font-[system-ui] text-[#001F3F] text-lg font-[400]">No bots. Our likes are from actual human beings who are active on Instagram.</span>
                </div>
                <div className="lg:w-[32%] h-[20rem] w-full flex flex-col justify-center hover:bg-gray-200 items-center p-4 border gap-4 rounded-2xl border-[#001F3F] transition duration-300 cursor-pointer">
                    <Image src="assets/icon/Cheapest prices.svg" width={100} height={100} alt="Plane" />
                    <span className="text-2xl font-[system-ui] text-[#001F3F] font-medium w-full">Cheapest prices</span>
                    <span className="font-[system-ui] text-[#001F3F] text-lg font-[400]">Grow your account without breaking the bank. No one else can match our pricing.</span>
                </div>
            </div>
        </div>
    )
}

export default WhyStormLike;