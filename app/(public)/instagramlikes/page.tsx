"use client"
import { useState, useEffect } from "react"; // Added useEffect import
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
import GetStarted from "../../components/checkout/GetStarted";
import CheckOut from "../../components/checkout/CheckOut";
import PayOut from "../../components/checkout/PayOut";
import SelectedPost from "../../components/checkout/SelectedPost";

const Instagramlikes = () => {
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
                                <div className="flex md:flex-row flex-col">
                                    <p className="lg:text-5xl md:text-[2.3rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                                        Buy Instagram Likes with{" "}
                                    </p>
                                    <span className="lg:text-5xl md:text-[2.3rem] text-[1.7rem] text-[#FFC107] font-[system-ui] font-[700] text-center ml-3">
                                        Instant Delivery
                                    </span>
                                </div>
                                <div className="mt-16 text-center flex flex-col justify-center items-center">
                                    <span className="text-center text-lg text-[#001F3F]">
                                        At Likes.io, you can buy Instagram likes quickly, safely, and easily with just a few clicks. 
                                        See our affordable prices and deals below.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Pass handleStartCheckout to LikesDelivery */}
                        <LikesDelivery onStartCheckout={handleStartCheckout} />
                        <WhyChooseLikesIO />
                        <Difference />
                        <WhoBuyInstagram />
                        <HowItWorks />
                        <WhyStillLikeMatter />
                        <Wondering />
                        <LikeFAQ />
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
                                    serviceType: selectedService?.type || 'likes',
                                    quantity: selectedService?.quantity || 1000,
                                    instagramUsername: "andri" // This should be passed from GetStarted
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

export default Instagramlikes;