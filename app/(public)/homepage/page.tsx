"use client"
import { FaCheck, FaInstagram, FaStar, FaTiktok, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import WhyStormLike from "../../components/homepage/WhyStormlike";
import Service from "../../components/homepage/Service";
import FAQ from "../../components/homepage/Faq";
import { useRouter } from "next/navigation";
import WhyWorkWithUs from "@/app/components/homepage/WhyWorkWithUs";
import StopFightingtheAlgorithm from "@/app/components/homepage/StopFightingtheAlgorithm";
import HowItWork from "@/app/components/homepage/HowItWork";
import WhyTrustUs from "@/app/components/homepage/WhyTrustUs";
import BenefitTheMost from "@/app/components/homepage/BenefitTheMost";
import Growing from "@/app/components/homepage/Growing";
import Difference from "@/app/components/homepage/Difference";
import { useState } from "react";

interface ServiceItem {
    title: string;
    route: string;
    category: 'instagram' | 'tiktok' | 'youtube';
}

interface ServiceCategory {
    id: 'instagram' | 'tiktok' | 'youtube';
    icon: React.ReactNode;
    title: string;
    rating: number;
    reviews: number;
    color: string;
}

const serviceCategories: ServiceCategory[] = [
    {
        id: 'instagram',
        icon: <FaInstagram className="text-4xl text-pink-500 group-hover:text-white transition-all" />,
        title: 'Instagram Services',
        rating: 5.0,
        reviews: 2720,
        color: 'text-pink-500'
    },
    {
        id: 'tiktok',
        icon: <FaTiktok className="text-4xl text-black group-hover:text-white transition-all" />,
        title: 'TikTok Services',
        rating: 5.0,
        reviews: 2720,
        color: 'text-black'
    },
    {
        id: 'youtube',
        icon: <FaYoutube className="text-4xl text-red-500 group-hover:text-white transition-all" />,
        title: 'Youtube Services',
        rating: 5.0,
        reviews: 2720,
        color: 'text-red-500'
    }
];

const services: ServiceItem[] = [
    { title: "Buy Instagram Followers", route: "/instagramfollowers", category: 'instagram' },
    { title: "Buy Instagram Likes", route: "/instagramlikes", category: 'instagram' },
    { title: "Buy Instagram Views", route: "/instagramviews", category: 'instagram' },
    { title: "Buy TikTok Views", route: "/tiktokviews", category: 'tiktok' },
    { title: "Buy TikTok Followers", route: "/tiktokfollowers", category: 'tiktok' },
    { title: "Buy TikTok Likes", route: "/tiktoklikes", category: 'tiktok' },
];

const Homepage = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<'instagram' | 'tiktok' | 'youtube' | 'all'>('all');

    const handleServiceClick = (route: string) => {
        router.push(route);
    };

    const handleCategoryClick = (categoryId: 'instagram' | 'tiktok' | 'youtube') => {
        setSelectedCategory(categoryId);
    };

    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category === selectedCategory);

    const renderServiceCategory = (category: ServiceCategory) => (
        <button
            key={category.id}
            className={`custome-button flex justify-center gap-3 group transition-all`}
            onClick={() => handleCategoryClick(category.id)}
        >
            {category.icon}
            <div className="flex flex-col gap-1 py-4">
                <span className="text-xl">{category.title}</span>
                <div className="flex items-center">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-l-full border">
                        <FaStar className="text-green-500 text-xl" />
                        <span className="text-gray-600 font-[system-ui] group-hover:text-white">{category.rating}</span>
                    </div>
                    <span className="text-gray-600 px-2 py-1 rounded-r-full font-[system-ui] border bg-gray-200">{category.reviews}+</span>
                </div>
            </div>
        </button>
    );

    const renderServiceButton = (service: ServiceItem) => (
        <button
            key={service.title}
            onClick={() => handleServiceClick(service.route)}
            className="py-4 rounded-lg text-white font-bold font-[system-ui] bg-gradient-to-r from-[#296FF9] to-[#59CEFC] uppercase text-sm hover:from-[#1a5fe0] hover:to-[#4ab8e8] transition-all duration-300"
        >
            {service.title}
        </button>
    );

    return (
        <section className="w-full flex flex-col justify-center items-center mt-[100px]">
            <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10 gap-10">
                <div className="w-full flex flex-col justify-center items-center gap-3">
                    <h1 className="lg:text-4xl md:text-[2.3rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                        Buy Instagram and TikTok Followers and Other Interactions</h1>
                    <div className="lg:text-5xl md:text-[2.3rem] text-[1.6rem] font-[system-ui] font-[700] text-center ml-3 text-[#001F3F]">
                        <p className="text-[#FFC107]">Delivered in Minutes!</p>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center mt-8 px-2 gap-2">
                    <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                        Instagram Followers and Engagement Starts Here</span>
                    <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                        Let's be real. Building your Instagram following feels like a never-ending grind. You put out content that you're proud of but the likes barely trickle in. Your follower count slowly moves.</span>
                    <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                        <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                            All while your competitors seem to blow up overnight.</span>
                        <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                            The truth? Instagram favors accounts that already have momentum. Without that initial push the algorithm just isn't on your side.</span>
                        <span className="md:w-[70%] w-full text-start md:text-xl text-base font-[system-ui] text-gray-600">
                            We're not here to sell you fake followers. Our #1 mission is to connect you with real people who engage with your content and give you the nudge you need.</span>
                    </span>
                </div>

                <div className="w-full flex flex-col justify-center items-center sm:px-[5.5rem] px-2 gap-2 mt-8">
                    <div className="w-full max-w-4xl grid grid-cols-3 gap-2 transition-all">
                        {serviceCategories.map(renderServiceCategory)}
                    </div>

                    <div className="lg:w-1/2 w-full flex gap-2 flex-col mt-4">
                        {filteredServices.map(renderServiceButton)}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-8">
                    <div className="lg:flex lg:justify-center lg:w-[65%] w-full lg:items-center grid grid-cols-[60%,40%] place-items-center grid-rows-2 bg-transparent lg:py-4 lg:px-0 px-2 rounded-lg">
                        <div className="flex gap-1 lg:order-1 order-1 md:justify-center justify-start md:w-auto sm:w-[60%]">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-[#eab308] p-[0.5rem] w-8 h-8 flex justify-center items-center rounded-lg">
                                    <FaStar className="text-lg text-white" />
                                </div>
                            ))}
                            <div className="w-[1px] h-8 bg-gray-500 ml-3 lg:flex hidden"></div>
                        </div>

                        <div className="flex items-center gap-2 bg-transparent text-white lg:px-4 py-[0.5rem] rounded-lg lg:w-[50%] sm:w-[75%] w-full lg:order-2 order-3 lg:ml-4 lg:mr-4 col-span-2">
                            <div className="content w-full">
                                <div className="slider w-full">
                                    <div className="slider-text-1 text-sm font-bold w-full">
                                        <span className="relative flex size-3 ml-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75"></span>
                                            <span className="relative inline-flex size-3 rounded-full bg-[#2ECC71]"></span>
                                        </span>
                                        <div className="flex justify-between w-full h-full mt-20px items-center text-[#2ECC71] px-2">
                                            <div className="w-1/2 flex justify-center font-[system-ui]"><b>100 likes &nbsp;</b>delivered</div>
                                            <div className="w-1/2 flex justify-end items-center gap-2 font-[system-ui]">
                                                <span className="p-1 rounded-full bg-white text-[#2ECC71]"> <FaCheck /> </span>
                                                <span>19 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-text-2 text-sm font-bold w-full">
                                        <span className="relative flex size-3 ml-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75"></span>
                                            <span className="relative inline-flex size-3 rounded-full bg-[#2ECC71]"></span>
                                        </span>
                                        <div className="flex justify-between w-full h-full mt-20px items-center text-[#2ECC71] px-2">
                                            <div className="w-1/2 flex justify-center font-[system-ui]"><b>100 likes &nbsp;</b>delivered</div>
                                            <div className="w-1/2 flex justify-end items-center gap-2 font-[system-ui]">
                                                <span className="p-1 rounded-full bg-white text-[#2ECC71]"> <FaCheck /> </span>
                                                <span>19 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-text-3 text-sm font-bold w-full">
                                        <span className="relative flex size-3 ml-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75"></span>
                                            <span className="relative inline-flex size-3 rounded-full bg-[#2ECC71]"></span>
                                        </span>
                                        <div className="flex justify-between w-full h-full mt-20px items-center text-[#2ECC71] px-2">
                                            <div className="w-1/2 flex justify-center font-[system-ui]"><b>100 likes &nbsp;</b>delivered</div>
                                            <div className="w-1/2 flex justify-end items-center gap-2 font-[system-ui]">
                                                <span className="p-1 rounded-full bg-white text-[#2ECC71]"> <FaCheck /> </span>
                                                <span>19 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:justify-center justify-end md:ml-0 ml-10 items-center md:w-auto sm:w-[40%] lg:order-3 order-2">
                            <div className="w-[1px] h-8 bg-gray-500 lg:flex hidden"></div>
                            <button className="border border-[#eab308] px-3 py-2 rounded-lg ml-4">
                                <Image src="assets/icon/apple.svg" alt="Apple Pay" width={45} height={25} className="w-[45px] h-[25px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Stormlike /> */}
            <WhyStormLike />
            <Service />
            <WhyWorkWithUs />
            <StopFightingtheAlgorithm />
            <HowItWork />
            <WhyTrustUs />
            <BenefitTheMost />
            <FAQ />
            <Difference />
            <Growing />
        </section>
    )
}

export default Homepage;