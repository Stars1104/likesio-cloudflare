"use client"
import { FaCheck, FaStar } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import StarRating from "../../components/Star";

const Review = () => {

    const [isReviewSection, setIsReciewSection] = useState<boolean>(false);

    const Review = [
        {
            id: 1,
            name: "Ar****",
            content: "How do you keep your prices so low? Able to deliver 20,000 legit and effective followers in minutes for god knows how many customers, support reps available around the clock, and 100 followers cost less than three dollars? I can not understand it, but I am not complaining lol.",
            country: "United States",
            term: "2 months ago"
        },
        {
            id: 2,
            name: "Dany****",
            content: "I have tried several other Instagram providers but they never did what they promised. Twicsy is different. Their followers are all real and never disappear, they deliver a new audience of viewers, and they jumpstart popularity. I know you say you have 24-hour customer service, but I will take your word for that one because I have never needed it. Everything works just like it is supposed to and this is the fifth package of followers I have bought.",
            country: "United States",
            term: "1 months ago"
        },
        {
            id: 3,
            name: "Jerod ****",
            content: "It was like a miracle. After spinning my wheels for several years trying to find new followers, I bought 250 followers from your website and had better results than I got from two years of posting great content, using hashtags, commenting on hundreds of other accounts, and linking to my Insta profile every place I could think of. Anyone who wants to get popular on the app is just wasting their time until they buy your amazing Instagram followers.",
            country: "United States",
            term: "2 months ago"
        },
        {
            id: 4,
            name: "Ar****",
            content: "How do you keep your prices so low? Able to deliver 20,000 legit and effective followers in minutes for god knows how many customers, support reps available around the clock, and 100 followers cost less than three dollars? I can not understand it, but I am not complaining lol.",
            country: "United States",
            term: "2 months ago"
        },
        {
            id: 5,
            name: "Dany****",
            content: "I have tried several other Instagram providers but they never did what they promised. Twicsy is different. Their followers are all real and never disappear, they deliver a new audience of viewers, and they jumpstart popularity. I know you say you have 24-hour customer service, but I will take your word for that one because I have never needed it. Everything works just like it is supposed to and this is the fifth package of followers I have bought.",
            country: "United States",
            term: "1 months ago"
        },
        {
            id: 6,
            name: "Jerod ****",
            content: "It was like a miracle. After spinning my wheels for several years trying to find new followers, I bought 250 followers from your website and had better results than I got from two years of posting great content, using hashtags, commenting on hundreds of other accounts, and linking to my Insta profile every place I could think of. Anyone who wants to get popular on the app is just wasting their time until they buy your amazing Instagram followers.",
            country: "United States",
            term: "2 months ago"
        },
        {
            id: 7,
            name: "Ar****",
            content: "How do you keep your prices so low? Able to deliver 20,000 legit and effective followers in minutes for god knows how many customers, support reps available around the clock, and 100 followers cost less than three dollars? I can not understand it, but I am not complaining lol.",
            country: "United States",
            term: "2 months ago"
        },
        {
            id: 8,
            name: "Dany****",
            content: "I have tried several other Instagram providers but they never did what they promised. Twicsy is different. Their followers are all real and never disappear, they deliver a new audience of viewers, and they jumpstart popularity. I know you say you have 24-hour customer service, but I will take your word for that one because I have never needed it. Everything works just like it is supposed to and this is the fifth package of followers I have bought.",
            country: "United States",
            term: "1 months ago"
        },
        {
            id: 9,
            name: "Jerod ****",
            content: "It was like a miracle. After spinning my wheels for several years trying to find new followers, I bought 250 followers from your website and had better results than I got from two years of posting great content, using hashtags, commenting on hundreds of other accounts, and linking to my Insta profile every place I could think of. Anyone who wants to get popular on the app is just wasting their time until they buy your amazing Instagram followers.",
            country: "United States",
            term: "2 months ago"
        },
    ]

    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[100px]">
                <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10 px-2">
                    <div className="w-full flex flex-col justify-center items-center mb-12">
                        <div className="flex md:flex-row flex-col ">
                            <p className="lg:text-5xl md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                                Likes.io Review{" "}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:w-[40rem] w-full">
                        <span className="w-full md:text-center text-start md:text-xl text-base font-[system-ui] font-medium text-gray-600">
                            We value our long-standing reputation as the best source for buying Instagram{" "}
                            <span className="text-[#FFC107]">
                                followers {","}
                            </span>
                            <span className="text-[#FFC107]">
                                likes{","}
                            </span>
                            <span className="text-[#FFC107]">
                                comments
                            </span>&nbsp;{"and"}
                            <span className="text-[#FFC107] ml-1">
                                views
                            </span>.
                        </span>
                    </div>
                    <div className="w-full flex justify-center items-center mt-8">
                        <div className="w-full justify-center gap-6 lg:flex md:flex sm:flex items-center p-5 rounded-lg relative">
                            <div className="flex justify-center items-center lg:w-auto md:w-auto sm:w-auto w-full">
                                <div className="relative w-24 h-24 lg:flex md:flex sm:flex justify-center items-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-[#FFC107] progress-ring__circle stroke-current" style={{ "color": "#FFC107" }}
                                            strokeWidth="7"
                                            strokeLinecap="round"
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="transparent"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="calc(251.2 - (251.2 * 100) / 100)"
                                        ></circle>
                                        <text x="50" y="40" fontSize="20" style={{ "fontWeight": "bold", "fill": "#FFC107" }} textAnchor="middle" alignmentBaseline="middle">5</text>
                                        <text x="50" y="65" fontSize="15" textAnchor="middle" alignmentBaseline="middle">of 5</text>
                                    </svg>
                                </div>
                            </div>
                            <div className="lg:flex lg:flex-col md:flex md:flex-col justify-center items-center">
                                <div className="p-1 text-lg font-[system-ui] font-medium flex text-center justify-center items-center">Customers rate us &nbsp; <span className="text-[#FFC107]">Superb</span></div>
                                <div className="p-1 text-lg font-[system-ui] font-medium text-center">5/5 - based on 44 reviews</div>
                            </div>
                            <div className="flex items-center justify-center py-3 gap-1">
                                <FaStar color="#FFC107" className="w-6 h-6" />
                                <FaStar color="#FFC107" className="w-6 h-6" />
                                <FaStar color="#FFC107" className="w-6 h-6" />
                                <FaStar color="#FFC107" className="w-6 h-6" />
                                <FaStar color="#FFC107" className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:h-64 py-4 flex justify-start items-center mt-8 gap-8 md:flex-row flex-col">
                        <div className="md:w-64 w-full h-full md:py-0 py-4 flex flex-col justify-center items-center gap-1 bg-[#FFC107] text-white text-lg font-medium">
                            <span>Excellent</span>
                            <span className="flex gap-1"> <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> </span>
                            <span>5 average</span>
                            <span>950 reviews</span>
                            <span className="flex relative items-center justify-center ml-8">
                                <Image alt="reviews" width={120} height={90} src="/assets/icon/reviewsio.svg" color="white" />
                                <span className="absolute left-6">Likes.io</span>
                            </span>
                        </div>
                        <div className="md:w-[calc(100%-256px)] w-full h-full flex md:justify-start justify-center items-center gap-2">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                breakpoints={{
                                    425: {
                                        slidesPerView: 1,
                                    },
                                    540: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    796: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                spaceBetween={30}
                                loop={true}
                                autoplay={true}
                                navigation
                                className="w-full h-full"
                            >
                                {
                                    Review.map((item) => (
                                        <SwiperSlide key={item.id} className="w-full h-full">
                                            <div className="h-full w-60 flex flex-col justify-between p-4 shadow-sm cursor-pointer">
                                                <div className="w-full flex flex-col justify-center items-start gap-2 font-[system-ui]">
                                                    <div className="w-full flex justify-start items-center gap-2 flex-wrap">
                                                        <span>{item.name}</span>
                                                        <span className="flex text-[#FFC107]"> <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> </span>
                                                    </div>
                                                    <div className="w-full flex justify-start items-center gap-2">
                                                        <span className="text-white p-1 bg-black rounded-full text-[0.5rem]"><FaCheck /></span>
                                                        <span className="text-xs">Verified Customer</span>
                                                    </div>
                                                    <div className="w-full flex justify-start items-center gap-2">
                                                        <span className="text-[0.875rem]">{item.content.substring(0, 130) + "..."}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-end items-start gap-1 font-[system-ui]">
                                                    <span className="text-[0.75rem]">{item.country}</span>
                                                    <span className="text-[0.75rem]">{item.term}</span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-30">
                        <button className="flex justify-center items-center bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white font-medium py-3 px-8 md:mt-0 rounded-lg" onClick={() => setIsReciewSection(true)}>Submit Review</button>
                    </div>

                    <div className={`${isReviewSection ? "lg:w-[60%] md:w-[60%] sm:w-full w-full lg:flex md:flex sm:flex justify-center items-center bg-white rounded-lg relative dark:bg-white p-4 shadow-lg" : "hidden"}`}>
                        <div className="lg:w-[90%] md:w-[90%] sm:w-[90%] w-full relative">
                            <div className="w-6 h-6 border rounded-full absolute right-0 flex justify-center items-center cursor-pointer" onClick={() => setIsReciewSection(false)}>
                                <CgClose />
                            </div>
                            <div className="flex items-center py-3">
                                <StarRating />
                                <span className="px-4 text-xl font-bold">5 / 5</span>
                            </div>
                            <div className="w-full flex justify-center items-center gap-2 lg:flex-row md:flex-row sm:flex-row flex-col">
                                <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-100">
                                    <input
                                        className="px-0 w-full text-sm text-black-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:bg-gray-100"
                                        placeholder="Your Name" required />
                                </div>
                                <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-100">
                                    <input
                                        className="px-0 w-full text-sm text-black-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:bg-gray-100"
                                        placeholder="Your email" required />
                                </div>
                            </div>
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-100">
                                <textarea id="comment" rows={8}
                                    className="px-0 w-full text-sm text-black-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:bg-gray-100"
                                    placeholder="Write a comment..." required></textarea>
                            </div>
                            <button type="submit"
                                className="inline-flex items-center py-4 px-4 text-xs font-medium text-center text-white bg-gradient-to-r from-[#296FF9] to-[#59CEFC] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Review;