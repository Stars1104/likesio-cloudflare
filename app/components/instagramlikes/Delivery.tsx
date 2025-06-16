'use client';

import { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCheck, FaQuestion } from "react-icons/fa";
// import { useRouter } from "next/navigation";
import { getServicesByType } from '@/app/service/services-api';

interface Service {
  _id: string;
  name: string;
  type: string;
  quality: string;
  supplierServiceId: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  supplierPrice: number;
  minQuantity: number;
  maxQuantity: number;
  popular: boolean;
  featured: boolean;
  active: boolean;
  deliverySpeed: string;
  refillAvailable: boolean;
  cancelAvailable: boolean;
  finalPrice: number;
  savings: number;
}

// Add onStartCheckout prop
interface LikesDeliveryProps {
  onStartCheckout: (service: any) => void;
}

const UpdatedLikesDelivery: React.FC<LikesDeliveryProps> = ({ onStartCheckout }) => {
  // Backend integration states
  // const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  
  // UI states
  const [isHelpModelOpen, setIsHelpModelOpen] = useState<boolean>(false);
  const [isActiveFollowerModalOpen, setIsActiveFollowerModalOpen] = useState<boolean>(false);
  const [isHighQuality, setIsHighQuality] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("border-gray-300");
  
  // Arrays to store filtered services by quality
  const [regularServices, setRegularServices] = useState<Service[]>([]);
  const [premiumServices, setPremiumServices] = useState<Service[]>([]);
  
  // const router = useRouter();

  // Function to transform the Service object to match the expected format
  const mapServiceForCheckout = (service: Service | null) => {
    if (!service) return null;
    
    return {
      _id: service._id,
      type: service.type,
      quantity: service.quantity,
      price: service.finalPrice,  // Use finalPrice as price
      originalPrice: service.price, // Use price as originalPrice
      popular: service.popular,
      active: service.active,
      quality: service.quality
    };
  };

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await getServicesByType('likes');
        if (response.success && response.data) {
          const allServices = response.data;
          // setServices(allServices);
          
          // Filter services by quality
          const regular = allServices.filter((service: Service) => 
            service.quality === 'general' && service.active === true
          );
          const premium = allServices.filter((service: Service) => 
            service.quality === 'premium' && service.active === true
          );
          
          setRegularServices(regular);
          setPremiumServices(premium);
          
          // Set initial selected service
          if (regular.length > 0) {
            setSelectedService(regular[0]);
          }
        } else {
          // setError('Failed to fetch services');
          setFallbackServices();
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        // setError('Failed to load services. Please try again later.');
        setFallbackServices();
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
  
  // Fallback services in case API fails
  const setFallbackServices = () => {
    const fallbackData = [
      {
        _id: 'service1',
        name: 'Instagram Likes - Small',
        type: 'likes',
        quality: 'general',
        supplierServiceId: '1782',
        description: 'Boost your Instagram engagement with real-looking likes',
        price: 1.49,
        discount: 0.5,
        quantity: 100,
        supplierPrice: 0.1,
        minQuantity: 50,
        maxQuantity: 100,
        popular: false,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: false,
        cancelAvailable: true,
        finalPrice: 0.99,
        savings: 0.5,
      },
      {
        _id: 'service2',
        name: 'Instagram Likes - Basic',
        type: 'likes',
        quality: 'general',
        supplierServiceId: '1782',
        description: 'Quick delivery likes to enhance your post visibility',
        price: 2.99,
        discount: 1,
        quantity: 250,
        supplierPrice: 0.25,
        minQuantity: 100,
        maxQuantity: 250,
        popular: true,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: false,
        cancelAvailable: true,
        finalPrice: 1.99,
        savings: 1,
      },
      {
        _id: 'service3',
        name: 'Instagram Likes - Medium',
        type: 'likes',
        quality: 'general',
        supplierServiceId: '1783',
        description: 'Enhance your post engagement with quality likes',
        price: 4.99,
        discount: 2,
        quantity: 500,
        supplierPrice: 0.5,
        minQuantity: 250,
        maxQuantity: 500,
        popular: false,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: false,
        cancelAvailable: true,
        finalPrice: 2.99,
        savings: 2,
      },
      {
        _id: 'service4',
        name: 'Instagram Likes - Large',
        type: 'likes',
        quality: 'general',
        supplierServiceId: '1784',
        description: 'Significant boost to your content visibility',
        price: 8.99,
        discount: 4,
        quantity: 1000,
        supplierPrice: 1,
        minQuantity: 500,
        maxQuantity: 1000,
        popular: true,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: false,
        cancelAvailable: true,
        finalPrice: 4.99,
        savings: 4,
      },
      {
        _id: 'service5',
        name: 'Instagram Premium Likes - Small',
        type: 'likes',
        quality: 'premium',
        supplierServiceId: '1785',
        description: 'Premium likes from quality accounts',
        price: 3.99,
        discount: 1,
        quantity: 100,
        supplierPrice: 0.2,
        minQuantity: 50,
        maxQuantity: 100,
        popular: false,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: true,
        cancelAvailable: true,
        finalPrice: 2.99,
        savings: 1,
      },
      {
        _id: 'service6',
        name: 'Instagram Premium Likes - Medium',
        type: 'likes',
        quality: 'premium',
        supplierServiceId: '1786',
        description: 'High-engagement premium likes',
        price: 5.99,
        discount: 2,
        quantity: 250,
        supplierPrice: 0.5,
        minQuantity: 100,
        maxQuantity: 250,
        popular: true,
        featured: false,
        active: true,
        deliverySpeed: 'Within 24 hours',
        refillAvailable: true,
        cancelAvailable: true,
        finalPrice: 3.99,
        savings: 2,
      },
    ];
    
    // setServices(fallbackData);
    
    const regular = fallbackData.filter(service => 
      service.quality === 'general' && service.active === true
    );
    const premium = fallbackData.filter(service => 
      service.quality === 'premium' && service.active === true
    );
    
    setRegularServices(regular);
    setPremiumServices(premium);
    
    if (regular.length > 0) {
      setSelectedService(regular[0]);
    }
  };

  // Switch between tabs (High-Quality and Premium)
  const handleTabChange = (tabType: 'general' | 'premium') => {
    const isRegular = tabType === 'general';
    setIsHighQuality(isRegular);
    setIsActive(!isRegular);
    setBorderColor(isRegular ? "border-gray-300" : "border-[#296FF9]");
    
    // Select the first service in the new tab
    const serviceList = isRegular ? regularServices : premiumServices;
    if (serviceList.length > 0) {
      setSelectedService(serviceList[0]);
    }
  };

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  // Start checkout process - modified to use the parent's callback
  const handleBuyNow = () => {
    if (selectedService) {
      // Pass the mapped service to the parent component's handler
      onStartCheckout(mapServiceForCheckout(selectedService));
    }
  };
  
  // Main component render - simplified to just show service selection
  return (
    <div className="w-full bg-white pb-12">
      <div className="max-w-7xl w-full mx-auto px-2 flex flex-col justify-center items-center">
        {/* Intro text */}
        <div className="md:w-[80%] w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg">
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Select one of our premium Instagram likes packages below to boost your engagement. 
            We offer high-quality likes that are delivered quickly to your posts.
          </p>
        </div>
        
        {/* Main service selection UI */}
        <div className="flex justify-center">
          <div className="md:w-[600px] w-[100%]">
            {/* Tabs */}
            <div className="w-full flex justify-center">
              <div 
                className={`w-1/2 flex justify-start items-center p-4 border cursor-pointer rounded-t-lg ${isHighQuality ? "border-t-2 border-l-2 border-r-2 border-b-0 border-gray-300" : ""}`} 
                onClick={() => handleTabChange('general')}
              >
                <span className="font-medium text-lg">High-Quality Likes</span>
              </div>
              <div 
                className={`w-1/2 flex justify-start items-center p-4 border cursor-pointer relative bg-gradient-to-r from-[#296FF9] to-[#59CEFC] rounded-t-lg ${isActive ? "border-t-2 border-l-2 border-r-2 border-b-0 border-[#296FF9]" : ""}`} 
                onClick={() => handleTabChange('premium')}
              >
                <span className="font-medium text-white text-lg">Premium Likes</span>
                <div className="flex justify-center items-center absolute top-7 right-3">
                  <div 
                    className="w-5 h-5 flex justify-center items-center rounded-full bg-white cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsActiveFollowerModalOpen(true);
                    }}
                  >
                    <FaQuestion className="w-[70%] h-[70%] text-gray-500" />
                  </div>
                </div>
                <span className="absolute p-1 text-white font-medium top-[-12px] flex justify-center items-center uppercase text-xs right-3 rounded-md bg-[#FF7B2F]">
                  recommended
                </span>
              </div>
            </div>
            
            {/* Services grid */}
            <div className={`w-full border-2 rounded-b-lg ${borderColor} p-6`}>
              {isLoading ? (
                <div className="py-8 text-center">Loading services...</div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {(isHighQuality ? regularServices : premiumServices).map((service) => (
                      <div 
                        key={service._id}
                        onClick={() => handleServiceSelect(service)}
                        className={`
                          relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center h-20
                          ${service._id === selectedService?._id 
                            ? `bg-gradient-to-r ${isHighQuality ? 'from-[#FFA567] to-[#FF4330]' : 'from-[#6EE7B7] to-[#10B981]'} text-white` 
                            : 'bg-gray-100 hover:bg-gray-200'
                          }
                        `}
                      >
                        {service.popular && (
                          <div className="absolute top-0 w-full bg-gradient-to-r from-[#6ee7b7] to-[#10b981] text-white text-xs uppercase py-0.5 px-1 rounded-t-lg text-center">
                            Best selling
                          </div>
                        )}
                        <div className="text-lg font-medium">{service.quantity}</div>
                        <div className="text-xs font-medium">${service.discount.toFixed(2)} OFF</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Price display */}
                  {selectedService && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-baseline">
                          <span className="text-gray-500 text-lg">$</span>
                          <span className="text-3xl font-medium">{selectedService.finalPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-gray-500 relative">
                          <span className="line-through">${selectedService.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Buy Now button - triggers parent's onStartCheckout */}
                      <button 
                        onClick={handleBuyNow}
                        className="w-full py-3 px-6 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white font-bold uppercase rounded-lg hover:opacity-90 transition-opacity"
                      >
                        BUY NOW
                      </button>
                      
                      {/* Savings text */}
                      <div className={`text-lg font-medium ${isHighQuality ? 'text-[#ff4330]' : 'text-[#296FF9]'}`}>
                        You Save ${selectedService.discount.toFixed(2)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Features comparison section */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {/* High Quality Likes card */}
              <div 
                className={`border rounded-lg overflow-hidden ${isHighQuality ? 'border-2 border-[#ff4330]' : ''}`}
                onClick={() => handleTabChange('general')}
              >
                <div className="p-4 border-b bg-white">
                  <h3 className="font-bold text-gray-800">High Quality Likes</h3>
                </div>
                <div className="p-4 bg-white space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">High Quality Likes</p>
                      <p 
                        className="underline text-sm cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHelpModelOpen(true);
                        }}
                      >
                        What&apos;s the difference?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">Fast delivery</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">No password required</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">24/7 support</p>
                  </div>
                </div>
              </div>
              
              {/* Premium Likes card */}
              <div 
                className={`border rounded-lg overflow-hidden ${isActive ? 'border-2 border-[#296FF9]' : ''}`}
                onClick={() => handleTabChange('premium')}
              >
                <div className="p-4 border-b bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white relative">
                  <h3 className="font-bold">Premium Likes</h3>
                  <div 
                    className="absolute right-3 top-4 w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsActiveFollowerModalOpen(true);
                    }}
                  >
                    <FaQuestion className="text-gray-500 text-xs" />
                  </div>
                </div>
                <div className="p-4 bg-white space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Premium Quality Likes</p>
                      <p 
                        className="underline text-sm cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsActiveFollowerModalOpen(true);
                        }}
                      >
                        What&apos;s the difference?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">Guaranteed delivery</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">30 day refills</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">No password required</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-[#001F3F] mt-1 flex-shrink-0" />
                    <p className="font-semibold text-sm">24/7 support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: What's the difference - High Quality */}
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${isHelpModelOpen ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              onClick={() => setIsHelpModelOpen(false)}
            >
              <CgClose size={20} />
            </button>
            <p className="text-gray-600">
              High Quality Likes are from real-looking accounts that provide a natural boost to your post engagement, 
              helping improve your content visibility on Instagram&apos;s algorithm.
            </p>
          </div>
        </div>

        {/* Modal: What's the difference - Premium */}
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${isActiveFollowerModalOpen ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              onClick={() => setIsActiveFollowerModalOpen(false)}
            >
              <CgClose size={20} />
            </button>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900">High Quality Likes</h3>
                <p className="text-gray-600">
                  These are likes from accounts with profile pictures but no further uploads on their account. 
                  Auto-refill is enabled within the warranty.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Premium Likes</h3>
                <p className="text-gray-600">
                  Premium likes are for those who are serious about their Instagram growth. 
                  These are guaranteed with very little to NO drop and come from more established accounts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedLikesDelivery;