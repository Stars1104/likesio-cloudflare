'use client';

import { useState, useEffect } from 'react';
import { FaComment, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa';
import GetStarted from '../checkout/GetStarted';
import CheckOut from '../checkout/CheckOut';
import PayOut from '../checkout/PayOut';
import SelectedPost from '../checkout/SelectedPost';
import { getServicesByType } from '@/app/service/services-api';

interface Service {
  _id: string;
  type: string;
  quantity: number;
  price: number;
  originalPrice: number;
  popular: boolean;
  active: boolean;
  featured?: boolean;
  quality?: string;
}

const CommentDelivery = () => {
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  const [isGetStarted, setIsGetStarted] = useState<boolean>(false);
  const [isPayOut, setIsPayOut] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await getServicesByType('comments');
        if (response.success && response.data) {
          setServices(response.data);
        } else {
          setError('Failed to fetch services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleGetStarted = () => {
    setIsGetStarted(true);
  };

  // Group services by quality for better display
  const groupServicesByType = () => {
    const grouped = services.reduce<Record<string, Service[]>>((acc, service) => {
      const serviceType = service.quality || 'general';
      if (!acc[serviceType]) {
        acc[serviceType] = [];
      }
      acc[serviceType].push(service);
      return acc;
    }, {});

    // If no services have quality, create default grouping
    if (Object.keys(grouped).length === 0) {
      return {
        'general': services
      };
    }

    return grouped;
  };

  const groupedServices = groupServicesByType();

  return (
    <div className="w-full bg-white pb-4">
      <GetStarted isGetStarted={isGetStarted} setIsCheckOut={setIsCheckOut} setIsGetStarted={setIsGetStarted} />
      <SelectedPost isCheckOut={isCheckOut} setIsCheckOut={setIsCheckOut} setIsPayOut={setIsPayOut} setIsGetStarted={setIsGetStarted} />
      <CheckOut isCheckOut={isCheckOut} setIsCheckOut={setIsCheckOut} setIsPayOut={setIsPayOut} setIsGetStarted={setIsGetStarted} />
      <PayOut isPayOut={isPayOut} setIsPayOut={setIsPayOut} setIsCheckOut={setIsCheckOut} />
      <div className="max-w-7xl w-full mx-auto px-2 pt-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#001F3F] mb-8">
          Customized <span className="text-[#FFC107]">Instagram Comments</span> Service
        </h2>
        <div className="mb-8">
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {isLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 animate-pulse rounded-lg p-6 h-64 w-full"
                  ></div>
                ))
              ) : error ? (
                <div className="col-span-full text-center text-red-500">{error}</div>
              ) : services.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No services available at the moment</div>
              ) : (
                Object.entries(groupedServices).map(([type, typeServices]) => (
                  typeServices.map((service) => (
                    <div 
                      key={type} 
                      className={`border rounded-lg relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
                        service.popular ? 'border-amber-500 shadow-md' : 'border-gray-200'
                      }`}
                    >
                      {service.popular && (
                        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                          POPULAR
                        </div>
                      )}
                      <div className="px-6 py-5">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                              <FaComment className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {service.quantity} Comments
                            </h3>
                          </div>
                          {service.quality && (
                            <div className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full">
                              {service.quality.toUpperCase()}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCheckCircle className="text-amber-500 w-4 h-4 flex-shrink-0" />
                            <span>Custom Comments</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaClock className="text-amber-500 w-4 h-4 flex-shrink-0" />
                            <span>Fast Delivery</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaShieldAlt className="text-amber-500 w-4 h-4 flex-shrink-0" />
                            <span>No Password Required</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            {service.originalPrice > service.price ? (
                              <div>
                                <p className="text-sm text-gray-500 line-through">${service.originalPrice.toFixed(2)}</p>
                                <p className="font-bold text-amber-600 text-xl">${service.price.toFixed(2)}</p>
                              </div>
                            ) : (
                              <p className="font-bold text-amber-600 text-xl">${service.price.toFixed(2)}</p>
                            )}
                          </div>
                          <button 
                            onClick={handleGetStarted}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDelivery;