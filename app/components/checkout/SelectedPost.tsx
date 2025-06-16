"use client"
import Image from "next/image";
import { FaArrowCircleLeft, FaCheck, FaHeart } from "react-icons/fa";
import { FC, useState, useEffect } from "react";
import { getInstagramPosts } from "@/app/service/services-api";

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

interface SelectedPostProps {
  setIsCheckOut?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPayOut?: React.Dispatch<React.SetStateAction<boolean>>,
  isCheckOut?: boolean,
  setIsGetStarted?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSelectPost?: React.Dispatch<React.SetStateAction<boolean>>,
  instagramUsername?: string,
  currentService?: Service | null
}

interface Post {
  postId: string;
  postUrl: string;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  caption: string;
  timestamp: string;
  isSelected?: boolean;
}

const SelectedPost: FC<SelectedPostProps> = ({ 
  setIsCheckOut, 
  // setIsPayOut, 
  // isCheckOut, 
  setIsGetStarted,
  setIsSelectPost,
  instagramUsername = "zainjo", // Default value if not provided
  currentService
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [likesPerPost, setLikesPerPost] = useState(50);
  // const [price, setPrice] = useState(0);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    if (instagramUsername) {
      fetchInstagramPosts(instagramUsername);
    }

    // Set initial values based on current service
    if (currentService) {
      setLikesPerPost(Math.min(currentService.quantity, 1000)); // Cap initial per-post amount
      // setPrice(currentService.price);
      setServiceType(currentService.type);
    }
  }, [instagramUsername, currentService]);

  const fetchInstagramPosts = async (username: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getInstagramPosts(username);
      if (response.success && response.data) {
        // Add isSelected property to each post
        const postsWithSelection = response.data.map((post: Post) => ({
          ...post,
          isSelected: false
        }));
        setPosts(postsWithSelection);
      } else {
        setError("Failed to fetch Instagram posts");
        // Create fallback posts if API fails
        createFallbackPosts();
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Could not fetch Instagram posts. Using sample data instead.");
      // Create fallback posts if API fails
      createFallbackPosts();
    } finally {
      setIsLoading(false);
    }
  };

  const createFallbackPosts = () => {
    const fallbackPosts = Array(12).fill(0).map((_, index) => ({
      postId: `post-${index}`,
      postUrl: `https://instagram.com/p/sample${index}`,
      imageUrl: `/assets/media/${(index % 12) + 1}.jpg`, // Assuming you have these sample images
      likesCount: Math.floor(Math.random() * 1000),
      commentsCount: Math.floor(Math.random() * 100),
      caption: "Sample Instagram post",
      timestamp: new Date().toISOString(),
      isSelected: false
    }));
    setPosts(fallbackPosts);
  };

  const handleCheckout = () => {
    if (selectedCount === 0) {
      setError("Please select at least one post");
      return;
    }
    
    setIsSelectPost?.(false);
    setIsCheckOut?.(true);
  };

  const handleBack = () => {
    setIsSelectPost?.(false);
    setIsGetStarted?.(true);
  };

  const togglePostSelection = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].isSelected = !updatedPosts[index].isSelected;
    setPosts(updatedPosts);
    
    // Update selected count
    const count = updatedPosts.filter(post => post.isSelected).length;
    setSelectedCount(count);
  };

  // Calculate total price based on selection
  const calculateTotalPrice = () => {
    if (!currentService) return 0;
    
    // Base price per post
    const basePricePerPost = currentService.price / (currentService.quantity / likesPerPost);
    
    // Total price for all selected posts
    return basePricePerPost * selectedCount;
  };

  // Total price
  const totalPrice = calculateTotalPrice();

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full flex lg:flex-row flex-col justify-center lg:items-start items-center gap-6">
        <div className="lg:w-[35rem] w-full p-8 flex flex-col justify-center rounded-xl shadow-lg items-start gap-4 border">
          <button 
            className="font-bold cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            onClick={handleBack}
          > 
            <FaArrowCircleLeft /> Back
          </button>
          
          <div className="flex pb-4 border-b w-full">
            <h1 className="font-bold text-3xl">Select Posts</h1>
          </div>
          
          {error && !isLoading && (
            <div className="w-full p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="w-full flex justify-center items-center py-3 bg-gray-100 rounded-lg">
            <h1 className="font-medium">
              {selectedCount} posts selected / {likesPerPost} {serviceType} per post
            </h1>
          </div>
          
          {isLoading ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 h-32 w-full rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {posts.map((post, index) => (
                <div 
                  key={index} 
                  className="flex justify-center items-center relative hover:opacity-90 cursor-pointer group" 
                  onClick={() => togglePostSelection(index)}
                >
                  <div className="relative w-full h-32 overflow-hidden rounded-lg">
                    <Image 
                      src={post.imageUrl} 
                      fill
                      objectFit="cover"
                      alt="Instagram post" 
                      className="rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${post.isSelected ? 'bg-blue-500 bg-opacity-20' : 'bg-black bg-opacity-20 group-hover:bg-opacity-30'} transition-colors`}>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
                        <FaHeart /> {post.likesCount || '0'}
                      </div>
                    </div>
                  </div>
                  {post.isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 flex justify-center items-center bg-blue-600 rounded-full text-white">
                      <FaCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <button 
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-medium rounded-lg mt-6 transition-colors"
            onClick={() => fetchInstagramPosts(instagramUsername)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more posts'}
          </button>
          
          <div className="flex w-full flex-col items-start justify-center gap-2 mt-4 pt-4 border-t">
            <label htmlFor="likesPerPost" className="text-sm font-medium">Likes per post</label>
            <select 
              id="likesPerPost" 
              className="w-full block h-12 px-4 py-2.5 text-base font-medium leading-7 text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg focus:outline-none"
              onChange={(e) => setLikesPerPost(Number(e.target.value))}
              value={likesPerPost}
            >
              <option value="50">50 likes per post</option>
              <option value="100">100 likes per post</option>
              <option value="250">250 likes per post</option>
              <option value="500">500 likes per post</option>
              <option value="1000">1000 likes per post</option>
            </select>
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
              <div className="flex gap-4">
                <span className="flex items-center gap-2 font-medium"> 
                  <FaHeart className="text-yellow-500" /> {likesPerPost} {serviceType}
                </span>
                <span className="text-blue-600 font-medium cursor-pointer">Change</span>
              </div>
              <span className="font-medium">
                ${(currentService?.price ? (currentService.price / (currentService.quantity / likesPerPost)).toFixed(2) : '0.00')}
              </span>
            </div>
            
            <div className="w-full flex items-center justify-between">
              <span className="font-medium">Selected posts:</span>
              <span className="font-bold">{selectedCount}</span>
            </div>
            
            <div className="w-full flex items-center justify-between">
              <span className="font-medium text-lg">Total:</span>
              <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="w-full flex flex-col justify-center items-start gap-4 mt-6">
            <button 
              className="w-full py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] hover:from-[#1e5fd9] hover:to-[#48bdf2] text-white text-lg font-medium rounded-lg transition-colors" 
              onClick={handleCheckout}
              disabled={selectedCount === 0}
            >
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPost;