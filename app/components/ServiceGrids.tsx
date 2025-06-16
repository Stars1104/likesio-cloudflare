import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

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

interface ServiceGridProps {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  onSelectService: (service: Service) => void;
  serviceType: 'followers' | 'likes' | 'views';
}

const EnhancedServiceGrid: React.FC<ServiceGridProps> = ({ 
  services,
  isLoading,
  error,
  onSelectService,
  serviceType
}) => {
  const [activeTab, setActiveTab] = useState<string>('regular');
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Group services by quality
  const groupedServices = services.reduce<Record<string, Service[]>>((acc, service) => {
    const quality = service.quality?.toLowerCase() || 'regular';
    if (!acc[quality]) {
      acc[quality] = [];
    }
    acc[quality].push(service);
    return acc;
  }, {});

  // Make sure we have both regular and premium tabs
  const availableTabs = Object.keys(groupedServices);
  if (!availableTabs.includes('regular')) groupedServices.regular = [];
  if (!availableTabs.includes('premium')) groupedServices.premium = [];

  // Set first available tab as active if none are selected
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  // Select service by quantity and auto-scroll to price
  const handleSelectQuantity = (service: Service) => {
    setSelectedQuantity(service.quantity);
    setSelectedService(service);
  };

  // Handle buy now button click
  const handleBuyNow = () => {
    if (selectedService) {
      onSelectService(selectedService);
    }
  };

  // Get display text by service type
  const getServiceTypeText = () => {
    switch(serviceType) {
      case 'followers': return 'Followers';
      case 'likes': return 'Likes';
      case 'views': return 'Views';
      default: return 'Followers';
    }
  };

  // Calculate the discount amount
  const getDiscountAmount = (originalPrice: number, price: number) => {
    return (originalPrice - price).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="animate-pulse p-4">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto bg-red-50 p-4 rounded-lg text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden border">
      {/* Tabs */}
      <div className="flex border-b relative">
        <button
          className={`flex-1 text-center py-3 font-medium transition-colors ${
            activeTab === 'regular' 
              ? 'bg-white text-blue-600 border-b-2 border-blue-500' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('regular')}
        >
          High-Quality {getServiceTypeText()}
        </button>
        <button
          className={`flex-1 text-center py-3 font-medium transition-colors relative ${
            activeTab === 'premium' 
              ? 'bg-white text-blue-600 border-b-2 border-blue-500' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setActiveTab('premium')}
        >
          Premium {getServiceTypeText()}
          {activeTab !== 'premium' && (
            <span className="absolute -top-2 right-0 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md font-bold">
              RECOMMENDED
            </span>
          )}
        </button>
      </div>

      {/* Service Grid */}
      <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  {groupedServices[activeTab]?.sort((a, b) => a.quantity - b.quantity).map((service) => (
    <div
      key={service._id}
      onClick={() => handleSelectQuantity(service)}
      className={`relative cursor-pointer rounded-lg transition-all overflow-hidden ${
        service.quantity === selectedQuantity
          ? 'ring-2 ring-blue-500 shadow-md transform scale-[1.02]'
          : 'border hover:shadow-md hover:border-blue-200'
      }`}
    >
      {service.popular && (
        <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-[0.6rem] sm:text-xs font-bold py-0.5 text-center">
          BEST SELLING
        </div>
      )}
      <div className={`p-3 text-center ${service.popular ? 'pt-5 sm:pt-6' : ''}`}>
        <p className="font-bold text-lg sm:text-xl">{service.quantity}</p>
        {service.originalPrice > service.price ? (
          <p className="text-xs font-semibold text-green-600">${getDiscountAmount(service.originalPrice, service.price)} OFF</p>
        ) : (
          <p className="text-xs font-semibold text-gray-500">&nbsp;</p>
        )}
      </div>
    </div>
  ))}
</div>

        {selectedService && (
          <div className="mt-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-3xl font-bold text-blue-700">
                ${selectedService.price.toFixed(2)}
              </span>
              {selectedService.originalPrice > selectedService.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${selectedService.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <button 
              onClick={handleBuyNow}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors text-lg shadow-sm hover:shadow"
            >
              BUY NOW
            </button>
            
            {selectedService.originalPrice > selectedService.price && (
              <p className="text-center text-red-600 text-sm mt-2 font-medium">
                You Save ${getDiscountAmount(selectedService.originalPrice, selectedService.price)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="border-t mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4 border-r">
            <h3 className="font-bold mb-2 text-gray-800">High Quality {getServiceTypeText()}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">High Quality {serviceType === 'followers' ? 'Followers' : serviceType === 'likes' ? 'Likes' : 'Views'}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Fast delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No password required</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">24/7 support</span>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-2 text-gray-800">Premium {getServiceTypeText()}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">High Quality {serviceType === 'followers' ? 'Followers' : serviceType === 'likes' ? 'Likes' : 'Views'}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Guaranteed delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">30 day refills</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No password required</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">24/7 support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedServiceGrid;