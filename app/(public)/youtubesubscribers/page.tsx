"use client"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HowItWorks from "../../components/instagramlikes/HowItWorks";
import Rating from "../../components/homepage/Rating";
import LikesDelivery from "../../components/instagramlikes/Delivery";
import WhyChooseLikesIO from "../../components/instagramlikes/WhyChooseLikesIO";
import LikeFAQ from "../../components/instagramlikes/LikeFAQ";
import Difference from "../../components/instagramlikes/Difference";
import WhoBuyInstagram from "../../components/instagramlikes/WhoBuyInstagram";
import WhyStillLikeMatter from "../../components/instagramlikes/WhyStillLikeMatter";
import Wondering from "../../components/instagramlikes/Wondering";

const YouTubeSubscribers = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[100px]">
                <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10 px-2">
                    <div className="w-full flex flex-col justify-center items-center mb-12">
                        <div className="flex md:flex-row flex-col">
                            <p className="lg:text-5xl md:text-[2.3rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                                Buy YouTube Subscribers with{" "}
                            </p>
                            <span className="lg:text-5xl md:text-[2.3rem] text-[1.7rem] text-[#FFC107] font-[system-ui] font-[700] text-center ml-3">
                                Instant Delivery
                            </span>
                        </div>
                        <div className="mt-16">
                            <span className="text-center text-lg text-[#001F3F]">At Likes.io, you can buy YouTube subscribers quickly, safely, and easily with just a few clicks. See our affordable prices and deals below.</span>
                        </div>
                    </div>
                </div>

                <LikesDelivery />
                <WhyChooseLikesIO />
                <Difference />
                <WhoBuyInstagram />
                <HowItWorks />
                <WhyStillLikeMatter />
                <Wondering />
                <LikeFAQ />
                <Rating />
            </section>

            <Footer />
        </div>
    )
}

export default YouTubeSubscribers;