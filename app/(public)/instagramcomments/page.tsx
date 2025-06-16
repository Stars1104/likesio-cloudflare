import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/homepage/Faq";
import Rating from "../../components/homepage/Rating";
import CommentsDelivery from "../../components/instagramcomment/CommentDelivery";
import WhyChooseComment from "@/app/components/instagramcomment/WhyChooseComment";
import HowItWorks from "@/app/components/instagramcomment/HowItWorks";
import BenefitOfBuyingCom from "@/app/components/instagramcomment/BenefitOfBuyingCom";

const InstagramComment = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[100px]">
                <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10 px-2">
                    <div className="w-full flex flex-col justify-center items-center mb-12">
                        <div className="flex md:flex-row flex-col ">
                            <p className="lg:text-5xl md:text-[2.3rem] text-[1.4rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                                Buy Instagram Comments with{" "}
                            </p>
                            <span className="lg:text-5xl md:text-[2.3rem] text-[1.6rem] text-[#FFC107] font-[system-ui] font-[700] text-center ml-3">
                                Instant Delivery
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-12-500 md:w-[38rem] w-full">
                        <span className="text-center text-xl font-[system-ui] text-gray-600">
                            Likes.io revolutionary, customized technology lets you buy highly-
                        </span>
                        <span className="text-center text-xl font-[system-ui] text-gray-600">
                            relevant Instagram comments for your posts quickly, safely, and
                        </span>
                        <span className="text-center text-xl font-[system-ui] text-gray-600 flex md:flex-row flex-col">
                            easily with just a few clicks.{" "}
                            <span className="text-[#FFC107] ml-3">
                                See our deals below!
                            </span>
                        </span>
                    </div>
                </div>

                <CommentsDelivery />
                <WhyChooseComment />
                <HowItWorks />
                <BenefitOfBuyingCom />
                <FAQ />
                <Rating />
            </section>

            <Footer />
        </div>
    )
}

export default InstagramComment;