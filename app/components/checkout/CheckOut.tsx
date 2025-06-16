"use client"
import Image from "next/image";
import { FaArrowCircleLeft, FaBusinessTime, FaCalendar, FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { CgSupport } from "react-icons/cg";
import { FC, useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
// import { createOrder, processOrderPayment } from "@/app/service/services-api";

interface Service {
  _id: string;
  type: string;
  quantity: number;
  price: number;
  originalPrice: number;
  popular: boolean;
  active: boolean;
  quality?: string;
}

interface CheckOutProps {
  setIsCheckOut?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPayOut?: React.Dispatch<React.SetStateAction<boolean>>,
  isCheckOut?: boolean,
  setIsGetStarted?: React.Dispatch<React.SetStateAction<boolean>>,
  instagramUsername?: string,
  postUrl?: string,
  currentService?: Service | null
}

const Checkout: FC<CheckOutProps> = ({ 
  setIsCheckOut, 
  setIsPayOut, 
  isCheckOut, 
  setIsGetStarted,
  instagramUsername = "zainjo",
  postUrl,
  currentService
}) => {
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Pre-fill cardholder name if user is logged in
    if (user) {
      setCardholderName(user.name || user.username || "");
    }

    // Set service details
    if (currentService) {
      setPrice(currentService.price);
      setServiceType(currentService.type);
      setQuantity(currentService.quantity);
    }
  }, [user, currentService]);

  const handlePayOut = async () => {
    // Basic validation
    if (!cardNumber.trim() || !expiryDate.trim() || !ccv.trim() || !cardholderName.trim()) {
      setError("Please fill out all payment fields");
      return;
    }

    if (cardNumber.length < 15) {
      setError("Please enter a valid card number");
      return;
    }

    if (ccv.length < 3) {
      setError("Please enter a valid CCV");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // In a real implementation, this would create an order with your backend
      // and then process the payment
      
      // For this demo, we'll simulate a successful order after a delay
      setTimeout(() => {
        setIsProcessing(false);
        setIsCheckOut?.(false);
        setIsPayOut?.(true);
      }, 1500);
      
      // The real implementation would look something like this:
      /*
      // Create order
      const orderResponse = await createOrder({
        serviceId: currentService?._id || "default-service-id",
        instagramUsername,
        postUrl,
        quantity,
        paymentMethod: "credit_card"
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error || "Failed to create order");
      }

      // Process payment
      const orderId = orderResponse.data._id || orderResponse.data.id;
      const paymentResponse = await processOrderPayment(orderId);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || "Failed to process payment");
      }

      // Payment successful - move to next step
      setIsCheckOut?.(false);
      setIsPayOut?.(true);
      */
      
    } catch (error) {
      console.error("Payment processing error:", error);
      setError("Payment failed. Please try again or use a different payment method.");
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setIsGetStarted?.(true);
    setIsCheckOut?.(false);
  };

  return (
    <div className={`max-w-7xl w-full mx-auto flex-col justify-center items-center ${isCheckOut ? "flex" : "hidden"} px-4 py-12`}>
      <div className="w-full flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
        <div className="lg:w-[35rem] w-full p-8 flex flex-col justify-center rounded-xl shadow-lg items-start gap-4 border">
          <button 
            className="font-bold cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            onClick={handleBack}
          > 
            <FaArrowCircleLeft /> Back
          </button>
          
          <div className="flex pb-4 border-b w-full">
            <h1 className="font-bold text-3xl">Checkout</h1>
          </div>

          {error && (
            <div className="w-full p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col justify-center items-center gap-4 mt-4">
            <div className="w-full flex md:flex-row flex-col justify-between items-center gap-4">
              <span className="flex items-center gap-2 md:text-lg text-base font-medium">Pay with credit / debit card <FaLock className="text-yellow-500" /></span>
              <Image alt="Payment methods" src="/assets/icon/payment.svg" width={230} height={80} />
            </div>
            
            <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
              <div className="w-full flex py-1 items-start justify-start relative">
                <input 
                  className="w-full border border-[#001F3F] outline-none py-[0.7rem] px-12 font-medium rounded-lg" 
                  type="text" 
                  placeholder="Card Number" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, ''))}
                  maxLength={16}
                />
                <Image src="/assets/icon/creditcard.svg" width={30} height={28} alt="CreditCard" className="absolute left-2 top-[0.7rem]" />
              </div>
              <div className="w-full flex justify-center items-center gap-5">
                <div className="w-1/2 flex py-1 items-center justify-start relative">
                  <input 
                    className="w-full border border-[#001F3F] outline-none py-[0.7rem] px-12 font-medium rounded-lg" 
                    type="month" 
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <FaCalendar className="absolute left-2 top-[1rem] w-6 h-6 text-[#001F3F]" />
                </div>
                <div className="w-1/2 flex py-1 items-center justify-start relative">
                  <input 
                    className="w-full border border-[#001F3F] outline-none py-[0.7rem] px-12 font-medium rounded-lg" 
                    type="text" 
                    placeholder="CCV" 
                    value={ccv}
                    onChange={(e) => setCcv(e.target.value.replace(/[^\d]/g, ''))}
                    maxLength={4}
                  />
                  <FaLock className="absolute left-2 top-[1rem] w-6 h-6 text-[#001F3F]" />
                </div>
              </div>
              <div className="w-full flex py-1 items-start justify-start relative">
                <input 
                  className="w-full border border-[#001F3F] outline-none py-[0.7rem] px-12 font-medium rounded-lg" 
                  type="text" 
                  placeholder="Cardholder Name" 
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
                <FaUser className="absolute left-2 top-[1rem] w-6 h-6 text-[#001F3F]" />
              </div>
            </div>
          </div>
          
          <button 
            className={`w-full py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white text-lg font-medium rounded-lg mt-8 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#1e5fd9] hover:to-[#48bdf2]'}`} 
            onClick={handlePayOut}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${price.toFixed(2)}`}
          </button>
          
          <div className="w-full flex justify-center items-center mt-4">
            <span className="flex gap-1 text-xs text-center">By completing your order, you agree to the <b className="mx-1">terms of services</b> and <b className="mx-1">privacy policy.</b> </span>
          </div>
        </div>
        
        <div className="lg:w-[25em] w-full flex flex-col p-6 shadow-lg border rounded-lg">
          <div className="w-full flex justify-start items-center gap-4 pb-6 border-b">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex justify-center items-center overflow-hidden">
              <Image src="/assets/avatar/avatar.png" width={64} height={64} alt="Avatar" />
            </div>
            <div className="flex flex-col justify-center items-start font-medium">
              <span className="font-bold">@{instagramUsername}</span>
              <span className="text-blue-600 cursor-pointer">Change username</span>
            </div>
          </div>
          
          <div className="w-full flex flex-col justify-center items-start py-6 gap-4 border-b">
            <div className="w-full flex justify-between items-center">
              <span className="flex items-center gap-2 font-medium"> 
                <span className="capitalize">{serviceType}</span>
              </span>
              <span className="font-medium">{quantity}</span>
            </div>
            
            {postUrl && (
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-1">Post URL:</p>
                <p className="text-sm truncate text-blue-600">{postUrl}</p>
              </div>
            )}
            
            <div className="w-full flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-xl font-bold">Total to pay</span>
              <span className="font-medium text-xl">${price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="w-full flex flex-col justify-center items-start py-6 gap-4">
            <div className="w-full flex justify-start items-center gap-2">
              <FaUser className="text-blue-500" />
              <span className="flex gap-1"> <b>High quality</b> {serviceType}</span>
            </div>
            <div className="w-full flex justify-start items-center gap-2">
              <FaUnlock className="text-blue-500" />
              <span className="flex gap-1"> <b>No Instagram password</b> required </span>
            </div>
            <div className="w-full flex justify-start items-center gap-2">
              <FaBusinessTime className="text-blue-500" />
              <span className="flex gap-1"> <b>Fast delivery,</b> up to 10 mins</span>
            </div>
            <div className="w-full flex justify-start items-center gap-2">
              <CgSupport className="text-blue-500" />
              <span className="flex gap-1"> <b>24/7</b> support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;