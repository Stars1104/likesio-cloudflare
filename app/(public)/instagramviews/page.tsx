"use client"
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Rating from "../../components/homepage/Rating";
import ViewDelivery from "../../components/instagramview/ViewDelivery";
import BenefitOfBuyingView from "@/app/components/instagramview/BenefitOfBuyingView";
import HowItWorks from "../../components/instagramview/HowItWorks";
import ViewFAQ from "@/app/components/instagramview/FAQ";
import GetStarted from "../../components/checkout/GetStarted";
import CheckOut from "../../components/checkout/CheckOut";
import PayOut from "../../components/checkout/PayOut";
import SelectedPost from "../../components/checkout/SelectedPost";

const InstagramView = () => {
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
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[100px]">
                {!isInCheckoutFlow ? (
                    // Regular marketing content - shown when not in checkout flow
                    <>
                        <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10 px-2">
                            <div className="w-full flex flex-col justify-center items-center mb-12">
                                <div className="sm:w-[59%] w-auto flex-wrap flex flex-col justify-center items-center">
                                    <p className="text-center font-[system-ui] font-bold gap-4 text-[#001F3F] md:text-[2.3rem] text-[1.6rem] lg:text-[2.6rem]">
                                        <span>Buy Instagram Views to Skyrocket</span>{" "}
                                        <span className="text-[#FFC107] font-bold ml-2">Your Social Proof & Visibility</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-6 sm:mt-12 w-full max-w-2xl px-4">
                                <span className="text-base sm:text-lg lg:text-xl text-gray-600 text-center sm:text-start">
                                    At Likes.io, you can buy Instagram views quickly, safely, and easily with just a few clicks. See our affordable prices and deals below.
                                </span>
                            </div>
                        </div>

                        {/* Pass handleStartCheckout to ViewDelivery */}
                        <ViewDelivery onStartCheckout={handleStartCheckout} />
                        <BenefitOfBuyingView />
                        <HowItWorks />
                        <ViewFAQ />
                        <Rating />
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
                                    serviceType: selectedService?.type || 'views',
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
    )
}

export default InstagramView;