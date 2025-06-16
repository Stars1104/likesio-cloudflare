"use client"
import { FaHeart, FaMailBulk, FaStar, FaInstagram, FaLink,FaArrowCircleLeft } from "react-icons/fa";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
// import { validateInstagramProfile } from "@/app/service/services-api";
import { useAuth } from "@/app/contexts/AuthContext";

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

interface GetStartedProps {
  isGetStarted?: boolean;
  setIsCheckOut?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGetStarted?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectPost?: React.Dispatch<React.SetStateAction<boolean>>;
  currentService?: Service | null;
  onCancelCheckout?: () => void;
}

const GetStarted: FC<GetStartedProps> = ({ 
  setIsCheckOut, 
  isGetStarted, 
  setIsGetStarted,
  setIsSelectPost,
  currentService,
  onCancelCheckout 
}) => {
  const { user, isLoggedIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [serviceType, setServiceType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [promotions, setPromotions] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [showPostUrlField, setShowPostUrlField] = useState<boolean>(false);

  useEffect(() => {
    // If user is logged in, pre-fill email
    if (isLoggedIn && user) {
      setEmail(user.email || "");
      if (user.username) {
        setUsername(user.username);
      }
    }

    // If currentService is provided, set initial values
    if (currentService) {
      setPrice(currentService.price);
      setQuantity(currentService.quantity);
      setServiceType(currentService.type);
      
      // Show post URL field if service type is likes or views
      setShowPostUrlField(currentService.type === 'likes' || currentService.type === 'views');
    }
  }, [isLoggedIn, user, currentService]);

  // const validateUsername = async () => {
  //   if (!username.trim()) {
  //     setValidationError("Please enter an Instagram username");
  //     return false;
  //   }

  //   setIsValidating(true);
  //   setValidationError(null);
    
  //   try {
  //     const response = await validateInstagramProfile(username);
  //     if (response.success) {
  //       setProfileData(response.data);
  //       return true;
  //     } else {
  //       setValidationError("Could not validate Instagram username. Please check and try again.");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error validating username:", error);
  //     setValidationError("Could not validate Instagram username. Please check and try again.");
  //     return false;
  //   } finally {
  //     setIsValidating(false);
  //   }
  // };
// Replace the existing validateUsername function with this:
const validateUsername = async () => {
  if (!username.trim()) {
    setValidationError("Please enter an Instagram username");
    return false;
  }

  setIsValidating(true);
  setValidationError(null);
  
  try {
    // Bypass actual API validation - just simulate success
    // Comment out the actual API call:
    // const response = await validateInstagramProfile(username);
    
    // Simulate successful validation
    setTimeout(() => {
      setIsValidating(false);
    }, 500); // Fake loading for half a second to look realistic
    
    // Create mock profile data
    setProfileData({
      id: "mock_" + Date.now(),
      username: username,
      fullName: username,
      profilePicture: "https://ui-avatars.com/api/?name=" + username,
      isVerified: false,
      statistics: {
        followers: 1000,
        following: 500,
        posts: 50
      }
    });
    
    return true;
  } catch (error) {
    console.error("Error validating username:", error);
    setValidationError("Could not validate Instagram username. Please check and try again.");
    setIsValidating(false);
    return false;
  }
};
  const handleNext = async () => {
    // Basic validation
    if (!username.trim()) {
      setValidationError("Please enter an Instagram username");
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setValidationError("Please enter a valid email address");
      return;
    }

    // Validate post URL if required
    if (showPostUrlField && !postUrl.trim()) {
      setValidationError("Please enter an Instagram post URL");
      return;
    }

    // Validate Instagram username if not already validated
    if (!profileData) {
      const isValid = await validateUsername();
      if (!isValid) return;
    }

    // For likes, move to post selection; for followers, go to checkout
    if (serviceType === 'likes' || serviceType === 'views') {
      if (postUrl) {
        // If post URL already provided, skip to checkout
        setIsGetStarted?.(false);
        setIsCheckOut?.(true);
      } else {
        // Go to post selection
        setIsGetStarted?.(false);
        setIsSelectPost?.(true);
      }
    } else {
      // For followers, go straight to checkout
      setIsGetStarted?.(false);
      setIsCheckOut?.(true);
    }
  };

  return (
    <div className={`max-w-7xl w-full mx-auto flex-col justify-center items-center ${isGetStarted ? "flex" : "hidden"} px-4 py-12`}>
      <div className="w-full flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
        <div className="lg:w-[35rem] w-full p-8 flex flex-col justify-center rounded-xl shadow-lg items-start gap-4 border">
        <button 
            onClick={onCancelCheckout}
            className="font-bold cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowCircleLeft /> Back to Main Page
          </button>
          <div className="flex pb-4 border-b w-full">
            <h1 className="font-bold text-3xl">Get Started</h1>
          </div>
          
          {validationError && (
            <div className="w-full p-4 bg-red-50 text-red-700 rounded-lg">
              {validationError}
            </div>
          )}
          
          <div className="relative mb-2 w-full">
            <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaInstagram className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full block h-12 pr-5 pl-12 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none" 
                placeholder="Instagram username" 
              />
            </div>
          </div>
          
          <div className="relative mb-2 w-full">
            <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMailBulk className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full block h-12 pr-5 pl-12 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none" 
                placeholder="Enter Your Email" 
              />
            </div>
          </div>
          
          {showPostUrlField && (
            <div className="relative mb-2 w-full">
              <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLink className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  id="postUrl" 
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  className="w-full block h-12 pr-5 pl-12 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none" 
                  placeholder="Instagram post URL (optional)" 
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Optional: Enter the direct post URL or select posts in the next step
              </p>
            </div>
          )}
          
          <div className="relative mb-2 w-full">
            <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaHeart className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="serviceDisplay"
                className="w-full block h-12 pr-5 pl-12 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none"
                value={`${quantity} ${serviceType}`}
                readOnly
              />
              <span className="absolute right-12 top-[0.55rem] text-lg font-medium">${price.toFixed(2)}</span>
            </div>
          </div>
          
          {serviceType === 'likes' && (
            <div className="w-full mb-4 flex flex-col justify-center items-center py-4 bg-gray-100 gap-1 rounded-lg">
              <span className="text-blue-600 font-medium">Special Offer: Buy Automatic Instagram Likes and Save 25%</span>
              <span className="font-medium text-sm">Save time manually buying likes every time you post by</span>
              <span className="font-medium text-sm">subscribing to our Automatic Likes.</span>
              <span className="font-medium text-sm px-2 py-1 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] rounded-md text-white">Save 25% now!</span>
            </div>
          )}
          
          <div className="w-full flex justify-start items-center">
            <input
              type="checkbox"
              id="promotions"
              checked={promotions}
              onChange={(e) => setPromotions(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded outline-none"
            />
            <label className="ml-2 text-gray-600 font-[system-ui] text-sm" htmlFor="promotions">
              Send me special promotions and discounts
            </label>
          </div>
          
          <button 
            className="w-full py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white text-lg font-medium rounded-lg mt-8"
            onClick={handleNext}
            disabled={isValidating}
          >
            {isValidating ? 'Validating...' : 'Continue'}
          </button>
        </div>
        
        <div className="lg:w-[25em] w-full flex flex-col p-6 border rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center gap-4 py-6 border-b">
            <h3 className="font-bold text-xl text-center">Order Summary</h3>
            {currentService && (
              <div className="flex flex-col w-full items-center">
                <div className="bg-blue-50 rounded-lg p-4 w-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</span>
                    <span className="text-blue-600 font-bold">{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Quality</span>
                    <span className="text-blue-600 font-bold">{currentService.quality || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Price</span>
                    <span className="text-blue-600 font-bold">${price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="py-6">
            <div className="flex w-full flex-col justify-center items-center text-center font-medium mb-6">
              <span>One of the very best sites to invest <br />in social media marketing packages <br />is Likes.io.</span>
            </div>
            <div className="w-full flex justify-center items-start gap-1 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="w-full flex flex-col justify-center items-center py-6 gap-4">
              <span className="font-medium">- ABC Action News</span>
              <div className="w-[85px] h-[85px] rounded-full flex justify-center items-center border-4 border-[#FFC107]">
                <Image src="/assets/img/us.png" alt="US" width={80} height={80} className="rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;