"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowCircleLeft, FaBusinessTime, FaCheckCircle, FaUnlock, FaUser } from "react-icons/fa";
import { CgSupport } from "react-icons/cg";
import { FC, useState, useEffect } from "react";

interface OrderDetails {
  id: string;
  price: number;
  serviceType: string;
  quantity: number;
  instagramUsername: string;
  postUrl?: string;
}

interface PayOutProps {
  isPayOut?: boolean,
  setIsPayOut?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCheckOut?: React.Dispatch<React.SetStateAction<boolean>>,
  orderDetails?: OrderDetails
}

const PayOut: FC<PayOutProps> = ({ 
  isPayOut, 
  setIsPayOut, 
  setIsCheckOut,
  orderDetails = {
    id: "default-order-id",
    price: 12.99,
    serviceType: "followers",
    quantity: 1000,
    instagramUsername: "zainjo"
  }
}) => {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState<'processing' | 'completed' | 'failed'>('processing');
  const [countdown, setCountdown] = useState(5); // Countdown in seconds

  // Simulate order processing with a countdown
  useEffect(() => {
    if (!isPayOut) return;

    const timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setOrderStatus('completed');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPayOut]);

  // Redirect to dashboard after order completion
  useEffect(() => {
    if (orderStatus === 'completed') {
      const redirectTimer = setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [orderStatus, router]);

  const handleBack = () => {
    setIsCheckOut?.(true);
    setIsPayOut?.(false);
  };

  return (
    <div className={`max-w-7xl w-full mx-auto flex-col justify-center items-center ${isPayOut ? "flex" : "hidden"} px-4 py-12`}>
      <div className="w-full flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
        <div className="lg:w-[35rem] w-full p-8 flex flex-col justify-center rounded-xl shadow-lg items-start gap-4 border">
          {orderStatus === 'processing' && (
            <button 
              className="font-bold cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleBack}
            > 
              <FaArrowCircleLeft /> Back
            </button>
          )}
          
          <div className="flex pb-4 border-b w-full">
            <h1 className="font-bold text-3xl">Order Status</h1>
          </div>

          {/* Order Processing */}
          {orderStatus === 'processing' && (
            <div className="w-full">
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center text-blue-800 mb-2">Processing Your Order</h2>
                <p className="text-blue-700 text-center">
                  Your payment has been confirmed. We&apos;re now processing your order...
                </p>
                <p className="text-blue-700 text-center mt-4">
                  This will only take a few seconds (Updating in {countdown}...)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Payment received</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  <span>Processing order</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  <span>Order completed</span>
                </div>
              </div>
            </div>
          )}

          {/* Order Completed */}
          {orderStatus === 'completed' && (
            <div className="w-full">
              <div className="bg-green-50 p-6 rounded-xl mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <FaCheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center text-green-800 mb-2">Order Successfully Placed!</h2>
                <p className="text-green-700 text-center">
                  Your order has been successfully placed and is now being fulfilled.
                </p>
                <p className="text-green-700 text-center mt-4">
                  Redirecting you to your dashboard in a few seconds...
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Payment received</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Order processed</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Order completed</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-blue-800">
                  You can view your order status and details in your dashboard.
                </p>
              </div>
              
              <button 
                className="w-full py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white text-lg font-medium rounded-lg mt-8 hover:from-[#1e5fd9] hover:to-[#48bdf2] transition-colors"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
        
        <div className="lg:w-[25em] w-full flex flex-col p-6 shadow-lg border rounded-lg">
          <div className="w-full flex justify-start items-center gap-4 pb-6 border-b">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex justify-center items-center overflow-hidden">
              <Image src="/assets/avatar/avatar.png" width={64} height={64} alt="Avatar" />
            </div>
            <div className="flex flex-col justify-center items-start font-medium">
              <span className="font-bold">@{orderDetails.instagramUsername}</span>
            </div>
          </div>
          
          <div className="w-full flex flex-col justify-center items-start py-6 gap-4 border-b">
            <div className="w-full flex justify-between items-center">
              <span className="flex items-center gap-2 font-medium capitalize"> 
                {orderDetails.serviceType}
              </span>
              <span className="font-medium">{orderDetails.quantity}</span>
            </div>
            
            {orderDetails.postUrl && (
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-1">Post URL:</p>
                <p className="text-sm truncate text-blue-600">{orderDetails.postUrl}</p>
              </div>
            )}
            
            <div className="w-full flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-xl font-bold">Total</span>
              <span className="font-medium text-xl">${orderDetails.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="w-full flex flex-col justify-center items-start py-6 gap-4">
            <div className="w-full flex justify-start items-center gap-2">
              <FaUser className="text-blue-500" />
              <span className="flex gap-1"> <b>High quality</b> {orderDetails.serviceType}</span>
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
          
          <div className="w-full bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-sm text-center text-blue-800">
              Order ID: #{orderDetails.id.substring(0, 8)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayOut;