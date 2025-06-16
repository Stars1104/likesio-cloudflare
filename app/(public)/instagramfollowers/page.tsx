"use client"
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BoostYourIG from "../../components/instagramlikes/BoostYourIG";
import Rating from "../../components/homepage/Rating";
import FollowerDelivery from "../../components/instagramfollower/FollowerDelivery";
import BenefitOfBuyingFollower from "@/app/components/instagramfollower/BenefitOfBuyingFollower";
import FollowerFAQ from "@/app/components/instagramfollower/FollowerFAQ";
import WhyChooseFollowers from "@/app/components/instagramfollower/WhyChooseFollowers";
import HowItWorks from "@/app/components/instagramfollower/HowItWorks";
import GetStarted from "../../components/checkout/GetStarted";
import CheckOut from "../../components/checkout/CheckOut";
import PayOut from "../../components/checkout/PayOut";
import SelectedPost from "../../components/checkout/SelectedPost";

const InstagramFollower = () => {
    // Checkout flow state management
    const [isGetStarted, setIsGetStarted] = useState(false);
    const [isSelectPost, setIsSelectPost] = useState(false);
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isPayOut, setIsPayOut] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    
    // Determine if we're in any part of the checkout flow
    const isInCheckoutFlow = isGetStarted || isSelectPost || isCheckOut || isPayOut;
    
    // Add useEffect to scroll to top when entering checkout flow
    useEffect(() => {
        if (isInCheckoutFlow) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Use 'auto' for instant scroll without animation
            });
        }
    }, [isInCheckoutFlow]); // This effect runs whenever isInCheckoutFlow changes
    
    // Handler for starting the checkout process with selected service
    const handleStartCheckout = (service) => {
        setSelectedService(service);
        setIsGetStarted(true);
    };
    
    const resetCheckoutFlow = () => {
        setIsGetStarted(false);
        setIsSelectPost(false);
        setIsCheckOut(false);
        setIsPayOut(false);
        setSelectedService(null);
    };
    
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <section className="flex-1 w-full flex flex-col justify-center items-center mt-16 sm:mt-[100px]">
                {!isInCheckoutFlow ? (
                    // Regular marketing content - shown when not in checkout flow
                    <>
                        <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8">
                            <div className="w-full flex flex-col justify-center items-center mb-8 sm:mb-12">
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                                    <p className="text-[1.75rem] sm:text-3xl md:text-[2.3rem] lg:text-5xl font-bold text-center text-[#001F3F] leading-tight">
                                        Buy Instagram Followers
                                    </p>
                                    <span className="text-[1.75rem] sm:text-3xl md:text-[2.3rem] lg:text-5xl text-[#FFC107] font-bold text-center">
                                        Instantly
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-6 sm:mt-12 w-full max-w-2xl px-4">
                                <span className="text-base sm:text-lg lg:text-xl text-gray-600 text-center sm:text-start">
                                    At Likes.io, you can buy Instagram followers quickly, safely, and easily with just a few clicks. See our affordable prices and deals below.
                                </span>
                            </div>
                        </div>

                        {/* Pass handleStartCheckout to FollowerDelivery */}
                        <FollowerDelivery onStartCheckout={handleStartCheckout} />
                        <WhyChooseFollowers />
                        <HowItWorks />
                        <BenefitOfBuyingFollower />
                        <FollowerFAQ />
                        <Rating />
                        <BoostYourIG />
                    </>
                ) : (
                    // Checkout flow - only shown when in checkout flow
                    <div className="w-full max-w-7xl mx-auto px-4 py-8">
                        {isGetStarted && (
                            <GetStarted 
                                isGetStarted={isGetStarted} 
                                setIsCheckOut={setIsCheckOut} 
                                setIsGetStarted={setIsGetStarted}
                                setIsSelectPost={setIsSelectPost}
                                currentService={selectedService}
                                onCancelCheckout={resetCheckoutFlow} 
                            />
                        )}
                        
                        {isSelectPost && (
                            <SelectedPost 
                                isCheckOut={isSelectPost} 
                                setIsCheckOut={setIsCheckOut} 
                                setIsPayOut={setIsPayOut} 
                                setIsGetStarted={setIsGetStarted}
                                setIsSelectPost={setIsSelectPost}
                                currentService={selectedService}
                                // onCancelCheckout={resetCheckoutFlow}
                            />
                        )}
                        
                        {isCheckOut && (
                            <CheckOut 
                                isCheckOut={isCheckOut} 
                                setIsCheckOut={setIsCheckOut} 
                                setIsPayOut={setIsPayOut} 
                                setIsGetStarted={setIsGetStarted}
                                currentService={selectedService}
                                // onCancelCheckout={resetCheckoutFlow}
                            />
                        )}
                        
                        {isPayOut && (
                            <PayOut 
                                isPayOut={isPayOut} 
                                setIsPayOut={setIsPayOut} 
                                setIsCheckOut={setIsCheckOut}
                                orderDetails={{
                                    id: selectedService?._id || 'default-order-id',
                                    price: selectedService?.price || 4.99,
                                    serviceType: selectedService?.type || 'followers',
                                    quantity: selectedService?.quantity || 1000,
                                    instagramUsername: "zainjo" // This should be passed from GetStarted
                                }}
                                // onCancelCheckout={resetCheckoutFlow}
                            />
                        )}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}

export default InstagramFollower;