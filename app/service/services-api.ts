import apiClient from './api-client';

// Get all services
export const getAllServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

// Get services by type
export const getServicesByType = async (type: 'followers' | 'likes' | 'views' | 'comments') => {
  try {
    const response = await apiClient.get(`/services?type=${type}&active=true`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} services:`, error);
    throw error;
  }
};

// Get popular services
export const getPopularServices = async () => {
  try {
    const response = await apiClient.get('/services?popular=true&active=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular services:', error);
    throw error;
  }
};

// Get service by ID
export const getServiceById = async (serviceId: string) => {
  try {
    const response = await apiClient.get(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service ${serviceId}:`, error);
    throw error;
  }
};

// Create order
export const createOrder = async (orderData: {
  serviceId: string;
  instagramUsername: string;
  postUrl?: string;
  quantity: number;
  paymentMethod: string;
}) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Process order payment
export const processOrderPayment = async (orderId: string) => {
  try {
    const response = await apiClient.post(`/orders/${orderId}/process`);
    return response.data;
  } catch (error) {
    console.error(`Error processing payment for order ${orderId}:`, error);
    throw error;
  }
};

// Instagram profile validation
export const validateInstagramProfile = async (username: string) => {
  try {
    const response = await apiClient.get(`/instagram/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error validating Instagram profile ${username}:`, error);
    throw error;
  }
};

// Instagram post validation
export const validateInstagramPost = async (postUrl: string) => {
  try {
    const response = await apiClient.post('/instagram/validate-post', { url: postUrl });
    return response.data;
  } catch (error) {
    console.error(`Error validating Instagram post URL ${postUrl}:`, error);
    throw error;
  }
};

// Get Instagram posts
export const getInstagramPosts = async (username: string) => {
  try {
    const response = await apiClient.get(`/instagram/posts/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Instagram posts for ${username}:`, error);
    throw error;
  }
};

// Validate coupon
export const validateCoupon = async (code: string, amount: number, serviceType?: string) => {
  try {
    const response = await apiClient.post('/coupons/validate', {
      code,
      amount,
      serviceType
    });
    return response.data;
  } catch (error) {
    console.error(`Error validating coupon ${code}:`, error);
    throw error;
  }
};

// Apply coupon to order
export const applyCoupon = async (code: string, orderId: string) => {
  try {
    const response = await apiClient.post('/coupons/apply', {
      code,
      orderId
    });
    return response.data;
  } catch (error) {
    console.error(`Error applying coupon ${code} to order ${orderId}:`, error);
    throw error;
  }
};